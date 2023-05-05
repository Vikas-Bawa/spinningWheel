import React, { useEffect, useRef } from 'react';
import uncommon_1 from '../assets/wedges/uncommon_1.png';
import './style.css';
function Wheel() {
    const onMountRef = useRef(true);
    var padding = { top: 20, right: 40, bottom: 20, left: 40 },
        w = 500 - padding.left - padding.right,
        h = 500 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scale.category20();//category20c()
    //randomNumbers = getRandomNumbers();
    //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
    var data = [
        { "label": "Dell LAPTOP", "value": 1 }, // padding
        { "label": "IMAC PRO", "value": 2 }, //font-family
        { "label": "SUZUKI", "value": 3 }, //color
        { "label": "HONDA", "value": 4 }, //font-weight
        // { "label": "FERRARI", "value": 5 }, //font-size
        // { "label": "APARTMENT", "value": 6 }, //background-color
        // { "label": "IPAD PRO", "value": 7 }, //nesting
        // { "label": "LAND", "value": 8 }, //bottom
        // { "label": "MOTOROLLA", "value": 9 }, //sans-serif
        // { "label": "BMW", "value": 10 },
        // { "label": "LAMBORGHINI", "value": 11 },
        // { "label": "MCU", "value": 12 },
        // { "label": "ROVER", "value": 13 },
        // { "label": "CRUISER", "value": 14 },
        // { "label": "TRACTOR", "value": 15 },
        // { "label": "JEEP", "value": 16 },
        // { "label": "BULLET", "value": 17 },
        // { "label": "YAMAHA", "value": 18 },
        // { "label": "HERO", "value": 19 },
        // { "label": "RENAULT", "value": 20 },
        // { "label": "FORD", "value": 21 },
        // { "label": "JAGUAR", "value": 22 }
    ];
    var container;
    var vis;



    useEffect(() => {
        if (!onMountRef.current) return;
        onMountRef.current = false;
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width", w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
        vis = container.append("g");

        var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
        arcs.append("pattern")
            .attr('id', function (d, i) {
                return "wedgeImg" + (i + 1);
            })
            .attr('patternUnits', 'objectBoundingBox')
            .attr('width', '6')
            .attr('height', '6')
            .append('svg:image')
            .attr('xlink:href', uncommon_1)
            .attr("width", 100)
            .attr("height", 100)
            .attr("x", 30)
            .attr("y", 30);
        arcs.append("path")
            .attr("fill", function (d, i) { return color(i); })
            // adding the image
            // .attr("fill", "url(#wedgeImg1)")
            // .attr("fill", function (d, i) {
            //     return "url(#wedgeImg" + (i + 1) + ")";
            // })
            // .attr("transform", function (d) {
            //     d.angle = (d.startAngle + d.endAngle) / 2;
            //     return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")";
            // })
            .attr("d", function (d) { return arc(d); });
        // add the text
        var p = arcs.append("p")
        p.append("path")
            .attr("id", "curve") //Unique id of the path
        //     .attr("d", "M 0,300 A 200,200 0 0,1 400,300") //SVG path
        //     .style("fill", "none")
        //     .style("stroke", "#AAAAAA");

        arcs.append("text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
                // return 'rotate(-45) translate (100)';
            })
            .attr("text-anchor", "end")
            .text(function (d, i) {
                return data[i].label;
            });
        // p.append("text")
        //     .append("textPath") //append a textPath to the text element
        //     .attr("xlink:href", "#curve") //place the ID of the path here
        // .style("text-anchor", "middle") //place the text halfway on the arc
        // .attr("startOffset", "50%")
        // .text("Yay, my text is on a curve path")
        // arcs.append("text").attr("transform", function (d) {
        //     d.innerRadius = 0;
        //     d.outerRadius = r;
        //     d.angle = (d.startAngle + d.endAngle) / 2;
        //     return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
        //     // return 'rotate(-45) translate (100)';
        // })
        // .attr("text-anchor", "end")
        // .text(function (d, i) {
        //     return data[i].label;
        // });

        // arcs.append("text").attr("transform", function (d) {
        //     d.innerRadius = 0;
        //     d.outerRadius = r;
        //     d.angle = (d.startAngle + d.endAngle) / 2;
        //     return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
        //     // return 'rotate(-45) translate (100)';
        // })
        // .attr("text-anchor", "end")
        // .text(function (d, i) {
        //     return data[i].label;
        // });
        container.on("click", spin);

        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
            .style({ "fill": "black" });
        //draw spin cir
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({ "fill": "white", "cursor": "pointer" });
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 12)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({ "font-weight": "bold", "font-size": "30px" });
    }, [])

    const spin = (d) => {

        container.on("click", null);
        //all slices have been seen, all done
        console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
        if (oldpick.length == data.length) {
            console.log("done");
            container.on("click", null);
            return;
        }
        var ps = 360 / data.length,
            pieslice = Math.round(1440 / data.length),
            rng = Math.floor((1 * 1440) + 360);
        console.log('rng', rng);
        rotation = (Math.round(rng / ps) * ps);

        picked = Math.round(data.length - (rotation % 360) / ps);
        console.log('picked', picked)
        picked = picked >= data.length ? (picked % data.length) : picked;
        console.log('picked', picked)

        if (oldpick.indexOf(picked) !== -1) {
            d3.select(this).call(spin);
            return;
        } else {
            // oldpick.push(picked);
        }
        rotation += 90 - Math.round(ps / 2);
        vis.transition()
            .duration(6000)
            .attrTween("transform", rotTween)
            .each("end", function () {
                //mark question as seen
                d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                    .attr("fill", "grey");
                oldrotation = rotation;

                /* Get the result value from object "data" */
                console.log(data[picked].value)

                /* Comment the below line for restrict spin to sngle time */
                container.on("click", spin);
            });
    }

    function rotTween(to) {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function (t) {
            return "rotate(" + i(t) + ")";
        };
    }


    function getRandomNumbers() {
        var array = new Uint16Array(1000);
        var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
        if (window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function") {
            window.crypto.getRandomValues(array);
            console.log("works");
        } else {
            //no support for crypto, get crappy random numbers
            for (var i = 0; i < 1000; i++) {
                array[i] = Math.floor(Math.random() * 100000) + 1;
            }
        }
        return array;
    }

    return (
        <>
            <div id="chart"></div>
        </>
    )
}

export default Wheel
