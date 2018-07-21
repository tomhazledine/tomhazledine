import * as d3 from 'd3';
import careerData from '../data/career';

var homeGraphCheck = document.getElementById('career-graph');

if (homeGraphCheck) {
    console.log('loading career graph');

    // Set the dimensions of the canvas / graph
    const margin = { top: 0, right: 20, bottom: 30, left: 20 };
    let width = 600 - margin.left - margin.right;
    let height = 270 - margin.top - margin.bottom;

    const wrapper = d3.select('#career-graph');

    const wrapperWidth = parseInt(wrapper.style('width')),
        wrapperHeight = parseInt(wrapper.style('height'));

    height = wrapperHeight - margin.top - margin.bottom;
    width = wrapperWidth - margin.left - margin.right;

    // Parse the date / time
    // let parseDate = d3.timeFormat('%d-%b-%y').parse;
    // let bisectDate = d3.bisector(d => d.date).left;

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
            .defined(d => !isNaN(d[key]))
            .x(d => my_x(d.date))
            .y(d => my_y(d[key]));
        let line = lineGenerator(data);
        return `<path d="${line}" id="line_des" class="line line_des" />`;
    });

    let output = `
        <svg width=${width + margin.left + margin.right} height=${height +
        margin.top +
        margin.bottom}>
            <g transform="translate(${margin.left},${margin.top})">
                <g>
                    ${lines}
                </g>
                <g class="x axis axis--x"></g>
            </g>
        </svg>`;

    homeGraphCheck.insertAdjacentHTML('beforeend', output);

    // Add the X Axis
    d3
        .select('.axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    // Add the Y Axis
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);

    // append the circle at the intersection
    // focus.append("circle")
    //     .classed("y",true)
    //     .classed("hover",true)
    //     // .style("fill", "white")
    //     // .style("stroke", "steelblue")
    //     // .style("stroke-width", "2px")
    //     .attr("r", 4);

    // append the circle at the intersection
    focus
        .append('circle')
        .classed('y_mus', true)
        .classed('hover', true)
        .attr('r', 4);

    // append the circle at the intersection
    focus
        .append('circle')
        .classed('y_lego', true)
        .classed('hover', true)
        .attr('r', 4);

    // append the circle at the intersection
    focus
        .append('circle')
        .classed('y_art', true)
        .classed('hover', true)
        .attr('r', 4);

    // append the circle at the intersection
    focus
        .append('circle')
        .classed('y_des', true)
        .classed('hover', true)
        .attr('r', 4);

    // append the circle at the intersection
    focus
        .append('circle')
        .classed('y_dev selected', true)
        .classed('hover', true)
        .attr('r', 4);

    // append the rectangle to capture mouse
    svg
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
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
        if (!isNaN(d.musician)) {
            focus
                .select('circle.y_mus')
                .classed('active', true)
                // .defined(function(d) { return !isNaN(d.musician); })
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.musician) + ')');
        } else {
            focus.select('circle.y_mus').classed('active', false);
        }

        if (!isNaN(d.lego)) {
            focus
                .select('circle.y_lego')
                .classed('active', true)
                // .defined(function(d) { return !isNaN(d.lego); })
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.lego) + ')');
        } else {
            focus.select('circle.y_lego').classed('active', false);
        }

        if (!isNaN(d.artist)) {
            focus
                .select('circle.y_art')
                .classed('active', true)
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.artist) + ')');
        } else {
            focus.select('circle.y_art').classed('active', false);
        }

        if (!isNaN(d.designer)) {
            focus
                .select('circle.y_des')
                .classed('active', true)
                .attr('transform', 'translate(' + my_x(d.date) + ',' + my_y(d.designer) + ')');
        } else {
            focus.select('circle.y_des').classed('active', false);
        }

        if (!isNaN(d.developer)) {
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

    console.log(lineClass);
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
