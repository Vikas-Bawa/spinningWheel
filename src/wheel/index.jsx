import React, { useEffect, useRef } from 'react';
import applause from "../assets/applause.mp3";
import uncommon_1 from '../assets/wedges/uncommon_1.png';
import wheel from "../assets/wheel.mp3";
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
    var data = [
        { "label": "Dell LAPTOP", "value": 1 }, // padding
        { "label": "IMAC PRO", "value": 2 }, //font-family
        { "label": "SUZUKI", "value": 3 }, //color
        { "label": "HONDA", "value": 4 }, //font-weight
        { "label": "FERRARI", "value": 5 }, //font-size
        { "label": "APARTMENT", "value": 6 }, //background-color
        { "label": "IPAD PRO", "value": 7 }, //nesting
        { "label": "LAND ROVER", "value": 8 }, //bottom
        { "label": "MOTOROLLA", "value": 9 }, //sans-serif
        { "label": "BMW", "value": 10 },
        { "label": "LAMBORGHINI", "value": 11 },
        { "label": "MCU", "value": 12 },
        { "label": "HOVER", "value": 13 },
        { "label": "CRUISER", "value": 14 },
        { "label": "TRACTOR", "value": 15 },
        { "label": "JEEP", "value": 16 },
        { "label": "BULLET", "value": 17 },
        { "label": "YAMAHA", "value": 18 },
        { "label": "HERO", "value": 19 },
        { "label": "RENAULT", "value": 20 },
        { "label": "FORD", "value": 21 },
        { "label": "JAGUAR", "value": 22 }
    ];
    var container;
    var vis;
    var innerCircle;

    // let audio = new Audio("../assets/wheel.mp3");

    const startAudio = () => {
        console.log('playing sound')
        new Audio(wheel).play();
        setTimeout(() => {
            console.log('winner....')
            new Audio(applause).play();
        }, 6000);
    }


    // M-80,-190A210,210 0 0,1 80.492424,-194.492424L0,0Z
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
            .attr('width', '100%')
            .attr('height', '100%')
            .append('svg:image')
            .attr('xlink:href', uncommon_1)
            .attr("width", 60)
            .attr("height", 205)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                // return "rotate(" + (d.angle * 180 / Math.PI) + ")";
                return "rotate(" + (d.startAngle * 180 / Math.PI) + (d.angle * 180 / Math.PI) + ")translate(" + (-30) + ', ' + (-d.outerRadius) + ")";
            })

            .attr("transform-origin", "top left");
        var path = arcs.append("path")
        path.attr("fill", function (d, i) { return color(i); })
            // adding the image
            // .attr("fill", "url(#wedgeImg1)")
            // .attr("fill", function (d, i) {
            //     return "url(#wedgeImg" + (i + 1) + ")";
            // })
            .attr("transform", '(-45)')
            .attr("d", function (d) { console.log(arc(d)); return arc(d); })
            .on("mouseover", function (d) {
                d3.select(this.parentNode).transition()
                    .duration('500')
                    .attr("transform", function (d) {
                        return "scale(1.1)";
                    })
            }).on("mouseout", function (d) {
                d3.select(this.parentNode).transition()
                    .duration('500')
                    .attr("transform", function (d) {
                        return "scale(1)";
                    })
            })
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
                console.log('d.startAngle: ' + d.startAngle + 'd.endAngle: ' + d.endAngle + 'dangle : ', (d.angle * 180 / Math.PI));
                return "rotate(" + (d.angle * 180 / Math.PI) + ")translate(" + (0) + ', ' + (-(d.outerRadius - 30)) + ")";
                // return 'rotate(-45) translate (100)';
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return data[i].label;
            })
            .style("font-size", "0.5em")

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

        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
            .style({ "fill": "black" });
        //draw spin cir
        innerCircle = container.append("circle")
        innerCircle.attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({ "fill": "white", "cursor": "pointer" });
        //spin text
        innerCircle.on("click", spin);
        container.append("text")
            .attr("x", 0)
            .attr("y", 12)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({ "font-weight": "bold", "font-size": "30px" });
    }, [])

    const spin = (d) => {
        startAudio();
        innerCircle.on("click", null);
        //all slices have been seen, all done
        console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
        if (oldpick.length == data.length) {
            console.log("done");
            innerCircle.on("click", null);
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
                // .attr("fill", "grey");
                oldrotation = rotation;

                /* Get the result value from object "data" */
                console.log(data[picked].value)

                /* Comment the below line for restrict spin to sngle time */
                innerCircle.on("click", spin);
            });
    }

    function rotTween(to) {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function (t) {
            return "rotate(" + i(t) + ")";
        };
    }

    return (
        <>
            <div id="chart"></div>
        </>
    )
}

export default Wheel
