import React, { useEffect, useRef } from 'react';
import { data } from '../Constants';
import applause from "../assets/applause.mp3";
// import uncommon_1 from '../assets/wedges/fortune1.png';
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

    var container;
    var vis;
    var innerCircle;

    const startAudio = () => {
        console.log('playing sound')
        new Audio(wheel).play();
        setTimeout(() => {
            console.log('winner....')
            new Audio(applause).play();
        }, 6000);
    }

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
        var arc = d3.svg.arc()
            .outerRadius(r)
            .innerRadius(0);
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");

        arcs.append('svg:image')
            .attr('xlink:href', function (d, i) {
                return data[i].image;
            })
            .attr("width", 60)
            .attr("height", 205)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", function (d) {
                var centroid = arc.centroid(d);
                console.log('d...', d)
                console.log('centroid...', centroid)
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                // return "rotate(" + (d.angle * 180 / Math.PI) + ")";
                return "rotate(" + ((d.angle * 180) / Math.PI) + ")translate(" + (-30) + ', ' + (-d.outerRadius) + ")";
                // return "rotate(" + ((d.startAngle * 180 / Math.PI) + (d.angle * 180 / Math.PI)) + ")translate(" + (0) + ', ' + (-d.outerRadius) + ")";
            })
            .attr("transform-origin", "top left")
            .on("mouseover", function (d) {
                console.log(d3.select(this.parentNode), 'this is parent node')
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
            });
        arcs.append("path")
            .attr("fill", function (d, i) { return color(i); })
            .attr("fill", function (d, i) {
                return "url(#wedgeImg" + (i + 1) + ")";
            })
            .attr("d", function (d) { console.log(arc(d)); return arc(d); })
            .on("mouseover", function (d) {
                console.log(d3.select(this.parentNode), 'this is parent node')
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


        arcs.append("text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                console.log('d.startAngle: ' + d.startAngle + 'd.endAngle: ' + d.endAngle + 'dangle : ', (d.angle * 180 / Math.PI));
                return "rotate(" + (d.angle * 180 / Math.PI) + ")translate(" + (0) + ', ' + (-(d.outerRadius - 30)) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return data[i].label;
            })
            .style("font-size", "0.5em")


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
