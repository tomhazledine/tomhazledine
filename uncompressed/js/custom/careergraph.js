import * as d3 from 'd3';
import careerData from '../data/career';

var homeGraphCheck = document.getElementById('career-graph');

if (homeGraphCheck) {
    // Set the dimensions of the canvas / graph
    const margin = { top: 0, right: 20, bottom: 30, left: 20 };
    let width = 600 - margin.left - margin.right;
    let height = 270 - margin.top - margin.bottom;

    const wrapper = d3.select('#career-graph');

    const wrapperWidth = parseInt(wrapper.style('width')),
        wrapperHeight = parseInt(wrapper.style('height'));

    height = wrapperHeight - margin.top - margin.bottom;
    width = wrapperWidth - margin.left - margin.right;

    // Set the ranges
    let my_x = d3.scaleTime().range([0, width]);
    let my_y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    let xAxis = d3
        .axisBottom()
        .scale(my_x)
        .ticks(5);
    let yAxis = d3
        .axisLeft()
        .scale(my_y)
        .ticks(5);

    const keys = ['happiness', 'musician', 'lego', 'artist', 'designer', 'developer'];
    const keySlugs = {
        happiness: '',
        musician: 'mus',
        lego: 'lego',
        artist: 'art',
        designer: 'des',
        developer: 'dev'
    };

    // Parse the date / time
    let bisectDate = d3.bisector(d => d.date).left;
    let parseDate = d3.utcParse('%d-%b-%y');

    // Get the data
    let data = careerData.map(d => {
        d.date = parseDate(d.date);
        return d;
    });

    // Scale the range of the data
    my_x.domain(d3.extent(data, d => d.date));
    my_y.domain([0, 100]);

    // Define the line generators
    let lines = keys.map(key => {
        let lineGenerator = d3
            .line()
            .defined(d => typeof d[key] === 'number')
            .x(d => my_x(d.date))
            .y(d => my_y(d[key]))
            .curve(d3.curveCatmullRom.alpha(0.5));
        let line = lineGenerator(data);
        let selected = key === 'developer' ? 'selected' : '';
        if (key === 'happiness') return;
        return `<path d="${line}" id="line_${keySlugs[key]}" class="line line_${
            keySlugs[key]
        } ${selected}" />`;
    });

    let circles = keys.map(key => {
        let selected = key === 'developer' ? 'selected' : '';
        return `<circle r="4" class="hover y_${keySlugs[key]} ${selected}" />`;
    });

    let areas = keys.map(key => {
        let shapeGenerator = d3
            .area()
            .defined(d => typeof d[key] === 'number')
            .x(d => my_x(d.date))
            .y0(d => my_y(0))
            .y1(d => my_y(d[key]))
            .curve(d3.curveCatmullRom.alpha(0.5));
        let shape = shapeGenerator(data);
        let selected = key === 'developer' ? 'selected' : '';
        if (key === 'happiness') return;
        return `<path d="${shape}" class="chartarea area_${keySlugs[key]} ${selected}"></path>`;
    });

    let output = `
        <svg width=${width + margin.left + margin.right} height=${height +
        margin.top +
        margin.bottom}>
            <g transform="translate(${margin.left},${margin.top})">
                <g class="x axis axis--x"></g>
                <g class="lines">
                    ${lines}
                </g>
                <g class="areas">
                    ${areas}
                </g>
                <g class="focus">
                    ${circles}
                </g>
                <rect class="mouse-catcher" width="${width}" height="${height}" />
            </g>
        </svg>`;

    homeGraphCheck.insertAdjacentHTML('beforeend', output);

    // Add the X Axis
    d3
        .select('.axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    // append the rectangle to capture mouse
    let mouseCatcher = d3.select('.mouse-catcher');
    let focus = d3.select('.focus');

    mouseCatcher
        .on('mouseover', function() {
            focus.style('display', null);
        })
        .on('mouseout', function() {
            focus.style('display', 'none');
        })
        .on('mousemove', mousemove);

    function mousemove() {
        var x0 = my_x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        // focus.select("circle.y")
        //     .attr("transform",
        //           "translate(" + x(d.date) + "," +
        //                          y(d.happiness) + ")");
        if (typeof d.musician === 'number') {
            focus
                .select('circle.y_mus')
                .classed('active', true)
                // .defined(function(d) { return typeof d.musician === 'number'; })
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.musician) + ')');
        } else {
            focus.select('circle.y_mus').classed('active', false);
        }

        if (typeof d.lego === 'number') {
            focus
                .select('circle.y_lego')
                .classed('active', true)
                // .defined(function(d) { return typeof d.lego === 'number'; })
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.lego) + ')');
        } else {
            focus.select('circle.y_lego').classed('active', false);
        }

        if (typeof d.artist === 'number') {
            focus
                .select('circle.y_art')
                .classed('active', true)
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.artist) + ')');
        } else {
            focus.select('circle.y_art').classed('active', false);
        }

        if (typeof d.designer === 'number') {
            focus
                .select('circle.y_des')
                .classed('active', true)
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.designer) + ')');
        } else {
            focus.select('circle.y_des').classed('active', false);
        }

        if (typeof d.developer === 'number') {
            focus
                .select('circle.y_dev')
                .classed('active', true)
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.developer) + ')');
        } else {
            focus.select('circle.y_dev').classed('active', false);
        }
    }
    // });
}

var homegraphcheckboxes = document.getElementsByClassName('homegraphcheckbox');

for (var i = 0; i < homegraphcheckboxes.length; i++) {
    homegraphcheckboxes[i].addEventListener('change', _checkboxChange, false);
}

function _checkboxChange(e) {
    var value = this.value;
    var checked = this.checked;

    var lineClass = 'path.line_' + value;
    var circleClass = 'circle.y_' + value;
    var areaClass = 'path.area_' + value;
    var line = d3.selectAll(lineClass);
    var circle = d3.selectAll(circleClass);
    var area = d3.selectAll(areaClass);

    if (checked) {
        line.classed('selected', true);
        circle.classed('selected', true);
        area.classed('selected', true);
    } else {
        line.classed('selected', false);
        circle.classed('selected', false);
        area.classed('selected', false);
    }
}
