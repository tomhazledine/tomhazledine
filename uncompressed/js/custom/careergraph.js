var homeGraphCheck = document.getElementById('career-graph');

if (homeGraphCheck) {

    console.log('loading career graph');

    // Set the dimensions of the canvas / graph
    var margin = {top: 0, right: 20, bottom: 30, left: 20},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    var wrapper = d3.select('#career-graph');

    var wrapperWidth = parseInt(wrapper.style('width')),
            wrapperHeight = parseInt(wrapper.style('height')),
            height = wrapperHeight - margin.top - margin.bottom,
            width = wrapperWidth - margin.left - margin.right;

    // Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;
        bisectDate = d3.bisector(function(d) { return d.date; }).left;

    // Set the ranges
    var my_x = d3.time.scale().range([0, width]);
    var my_y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(my_x)
        .orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(my_y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return my_x(d.date); })
        .y(function(d) { return my_y(d.happiness); })
        .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

    // Define the line
    var valueline_mus = d3.svg.line()
        .defined(function(d) { return !isNaN(d.musician); })
        .x(function(d) { return my_x(d.date); })
        .y(function(d) { return my_y(d.musician); })
        .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

    // Define the line
    var valueline_lego = d3.svg.line()
        .defined(function(d) { return !isNaN(d.lego); })
        .x(function(d) { return my_x(d.date); })
        .y(function(d) { return my_y(d.lego); })
        .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

    // Define the line
    var valueline_art = d3.svg.line()
        .defined(function(d) { return !isNaN(d.artist); })
        .x(function(d) { return my_x(d.date); })
        .y(function(d) { return my_y(d.artist); })
        .interpolate('monotone');

    // Define the line
    var valueline_des = d3.svg.line()
        .defined(function(d) { return !isNaN(d.designer); })
        .x(function(d) { return my_x(d.date); })
        .y(function(d) { return my_y(d.designer); })
        .interpolate('monotone');

    // Define the line
    var valueline_dev = d3.svg.line()
        .defined(function(d) { return !isNaN(d.developer); })
        .x(function(d) { return my_x(d.date); })
        .y(function(d) { return my_y(d.developer); })
        .interpolate('monotone');
        
    // Adds the svg canvas
    var svg = d3.select("#career-graph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");
    var lineSvg = svg.append("g");
    var focus = svg.append("g") 
        .style("display", "none");

    // Get the data
    d3.csv(global_custom_vars.template_path + "/data/careergraph.csv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.happiness = +d.happiness;
            d.musician = +d.musician;
            d.lego = +d.lego;
            d.artist = +d.artist;
            d.designer = +d.designer;
            d.developer = +d.developer;
        });
        
        // Scale the range of the data
        my_x.domain(d3.extent(data, function(d) { return d.date; }));

        my_y.domain([0, 100]);//d3.max(data, function(d) { return d.happiness; })]);
        // y_mus.domain([0, d3.max(data, function(d) { return d.musician; })]);
        // y_lego.domain([0, d3.max(data, function(d) { return d.lego; })]);
        // y_art.domain([0, d3.max(data, function(d) { return d.artist; })]);
        
        // Add the valueline path.
        // lineSvg.append("path")
        //     .attr("class", "line")
        //     .attr("d", valueline(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("id", "line_mus")
            .attr("class", "line line_mus")
            .attr("d", valueline_mus(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("id", "line_lego")
            .attr("class", "line line_lego")
            .attr("d", valueline_lego(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("id", "line_art")
            .attr("class", "line line_art")
            .attr("d", valueline_art(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("id", "line_des")
            .attr("class", "line line_des")
            .attr("d", valueline_des(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("id", "line_dev")
            .attr("class", "line line_dev selected")
            .attr("d", valueline_dev(data));

        /**
         * AREAS
         */
        
        areas = lineSvg.append('path');
        areas_mus = lineSvg.append('path');
        areas_lego = lineSvg.append('path');
        areas_art = lineSvg.append('path');
        areas_des = lineSvg.append('path');
        areas_dev = lineSvg.append('path');

        // areaShape = d3.svg.area()
        //     .x(function(d){ return x(d.date); })
        //     .y0(function(d){ return y(0); })
        //     .y1(function(d){ return y(d.happiness); })
        //     .interpolate('monotone');

        areaShape_mus = d3.svg.area()
            .defined(function(d) { return !isNaN(d.musician); })
            .x(function(d){ return my_x(d.date); })
            .y0(function(d){ return my_y(0); })
            .y1(function(d){ return my_y(d.musician); })
            .interpolate('monotone');

        areaShape_lego = d3.svg.area()
            .defined(function(d) { return !isNaN(d.lego); })
            .x(function(d){ return my_x(d.date); })
            .y0(function(d){ return my_y(0); })
            .y1(function(d){ return my_y(d.lego); })
            .interpolate('monotone');

        areaShape_art = d3.svg.area()
            .defined(function(d) { return !isNaN(d.artist); })
            .x(function(d){ return my_x(d.date); })
            .y0(function(d){ return my_y(0); })
            .y1(function(d){ return my_y(d.artist); })
            .interpolate('monotone');

        areaShape_des = d3.svg.area()
            .defined(function(d) { return !isNaN(d.designer); })
            .x(function(d){ return my_x(d.date); })
            .y0(function(d){ return my_y(0); })
            .y1(function(d){ return my_y(d.designer); })
            .interpolate('monotone');

        areaShape_dev = d3.svg.area()
            .defined(function(d) { return !isNaN(d.developer); })
            .x(function(d){ return my_x(d.date); })
            .y0(function(d){ return my_y(0); })
            .y1(function(d){ return my_y(d.developer); })
            .interpolate('monotone');

        // areas
        //     .attr('d',areaShape(data))
        //     .attr('fill','none')
        //     .classed('chartarea area', true);

        areas_mus
            .attr('d',areaShape_mus(data))
            .attr('fill','none')
            .classed('chartarea area_mus', true);

        areas_lego
            .attr('d',areaShape_lego(data))
            .attr('fill','none')
            .classed('chartarea area_lego', true);

        areas_art
            .attr('d',areaShape_art(data))
            .attr('fill','none')
            .classed('chartarea area_art', true);

        areas_des
            .attr('d',areaShape_des(data))
            .attr('fill','none')
            .classed('chartarea area_des', true);

        areas_dev
            .attr('d',areaShape_dev(data))
            .attr('fill','none')
            .classed('chartarea area_dev selected', true);
        
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
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
        focus.append("circle")
            .classed("y_mus",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_lego",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_art",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_des",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_dev selected",true)
            .classed("hover",true)
            .attr("r", 4);
        
        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);
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
                focus.select("circle.y_mus")
                    .classed('active',true)
                    // .defined(function(d) { return !isNaN(d.musician); })
                    .attr("transform",
                          "translate(" + my_x(d.date) + "," +
                                         my_y(d.musician) + ")");
            } else {
                focus.select("circle.y_mus")
                    .classed('active',false);
            }
            
            if (!isNaN(d.lego)) {
                focus.select("circle.y_lego")
                    .classed('active',true)
                    // .defined(function(d) { return !isNaN(d.lego); })
                    .attr("transform",
                          "translate(" + my_x(d.date) + "," +
                                         my_y(d.lego) + ")");
            } else {
                focus.select("circle.y_lego")
                    .classed('active',false);
            }

            if (!isNaN(d.artist)) {
                focus.select("circle.y_art")
                    .classed('active',true)
                    .attr("transform",
                          "translate(" + my_x(d.date) + "," +
                                         my_y(d.artist) + ")");
            } else {
                focus.select("circle.y_art")
                    .classed('active',false);
            }

            if (!isNaN(d.designer)) {
                focus.select("circle.y_des")
                    .classed('active',true)
                    .attr("transform",
                          "translate(" + my_x(d.date) + "," +
                                         my_y(d.designer) + ")");
            } else {
                focus.select("circle.y_des")
                    .classed('active',false);
            }

            if (!isNaN(d.developer)) {
                focus.select("circle.y_dev")
                    .classed('active',true)
                    .attr("transform",
                          "translate(" + my_x(d.date) + "," +
                                         my_y(d.developer) + ")");
            } else {
                focus.select("circle.y_dev")
                    .classed('active',false);
            }
        }
    });

}

var homegraphcheckboxes = document.getElementsByClassName('homegraphcheckbox');

for (var i = 0; i < homegraphcheckboxes.length; i++) {
    homegraphcheckboxes[i].addEventListener('change',_checkboxChange,false);
};

function _checkboxChange(e){

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
        line.classed('selected',true);
        circle.classed('selected',true);
        area.classed('selected',true);
    } else {
        line.classed('selected',false);
        circle.classed('selected',false);
        area.classed('selected',false);
    }
}