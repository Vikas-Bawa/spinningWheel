import React, { useEffect, useRef } from 'react';
import { data } from '../Constants';
import applause from "../assets/applause.mp3";
import centrePanel from "../assets/centrePanel.png";
import frame from "../assets/frame.png";
import leftLine from "../assets/leftLine.png";
import pointer from "../assets/pointer.png";
import rightLine from "../assets/rightLine.png";
import spinTxt from "../assets/spin.png";
import square from "../assets/square.png";
import wheel from "../assets/wheel.mp3";
import './style.css';
function Wheel() {
    const onMountRef = useRef(true);
    var padding = { top: 10, right: 50, bottom: 10, left: 50 },
        w = 520 - padding.left - padding.right,
        h = 520 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scale.category20();//category20c()

    var container;
    var vis;
    var innerCircle;
    var vis2;

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
        svg.append('svg:image')
            .attr('xlink:href', frame)
            .attr("width", '515')
            .attr("height", '515')
            .attr("x", 0)
            .attr("y", 0)

        container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w / 2 + padding.left - 2) + "," + (h / 2 + padding.top + 12) + ")");
        vis = container.append("g");

        var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });

        var arc = d3.svg.arc()
            .outerRadius(r)
            .innerRadius(0);
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");

        arcs.append("path")
            .attr("fill", function (d, i) { return color(i) })
            .attr("d", function (d) { return arc(d); })

        var arc3 = d3.svg.arc()
            .outerRadius(170)
            .innerRadius(170);
        arcs.append("path")
            .attr("fill", 'rgba(0,0,0,1)')
            .attr("d", function (d) { return arc3(d); })
            .attr("stroke", 'rgba(0,0,0,0.3)')
            .attr("stroke-width", '0.5')
            .attr('stroke-dasharray', '2 2')

        // NFT image
        // arcs.append('svg:image')
        //     .attr('xlink:href', function (d, i) {
        //         return NFT;
        //     })
        //     .attr("width", 30)
        //     .attr("height", 30)
        //     .attr("x", -15)
        //     .attr("y", 0)
        //     .attr("transform", function (d) {
        //         d.innerRadius = 0;
        //         d.outerRadius = r;
        //         d.angle = (d.startAngle + d.endAngle) / 2;
        //         return "rotate(" + ((d.angle * 180) / Math.PI) + ")translate(" + (0) + ', ' + (-d.outerRadius + 50) + ")";
        //     })
        //     .attr("style", "opacity:0.5;")


        //make pointer
        svg.append('svg:image')
            .attr('xlink:href', pointer)
            .attr("width", 60)
            .attr("height", 80)
            .attr("x", 228)
            .attr("y", 10)

        //draw spin circle
        innerCircle = container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 210)
            .style({ "fill": "url(#circularGradient)" });

        vis2 = container.append('g')
        var gradArc = d3.svg.arc()
            .outerRadius(r)
            .innerRadius(0);
        var gradArcs = vis2.selectAll("g.sliceTxt")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "sliceTxt");
        gradArcs.append("text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                console.log('d.startAngle: ' + d.startAngle + 'd.endAngle: ' + d.endAngle + 'dangle : ', (d.angle * 180 / Math.PI));
                return "rotate(" + (d.angle * 180 / Math.PI) + ")translate(" + (0) + ', ' + (-(d.outerRadius - 15)) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return data[i].label;
            })
            .style({ "font-size": "0.7em", "font-weight": "700", 'fill': 'white' });
        gradArcs.append("text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI) + ")translate(" + (0) + ', ' + (-(d.outerRadius - 30)) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return data[i].value;
            })
            .style({ "font-size": "0.7em", "font-weight": "700", 'fill': 'rgba(0,0,0,0.5)' });
        gradArcs.append('svg:image')
            .attr('xlink:href', function (d, i) {
                return leftLine;
            })
            .attr("width", 8)
            .attr("height", 210)
            .attr("x", -2.5)
            .attr("y", 0)
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + ((d.startAngle * 180) / Math.PI) + ")translate(" + (0) + ', ' + (-d.outerRadius - 8) + ")";
            })
        gradArcs.append('svg:image')
            .attr('xlink:href', function (d, i) {
                return rightLine;
            })
            .attr("width", 8)
            .attr("height", 210)
            .attr("x", -6)
            .attr("y", 0)
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + ((d.endAngle * 180) / Math.PI) + ")translate(" + (0) + ', ' + (-d.outerRadius - 8) + ")";
            });
        // square image
        gradArcs.append('svg:image')
            .attr('xlink:href', function (d, i) {
                return square;
            })
            .attr("width", 10)
            .attr("height", 10)
            .attr("x", -5)
            .attr("y", 0)
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + ((d.angle * 180) / Math.PI) + ")translate(" + (0) + ', ' + (-d.outerRadius + 35) + ")";
            })

        //spin text
        // innerCircle.on("click", spin);
        let circularGrad = container.append("radialGradient")
            .attr('id', 'circularGradient')
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "0%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 1);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "30%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 0.2);
        // circularGrad
        //     .append("stop")
        //     .attr("class", "start")
        //     .attr("offset", "35%")
        //     .attr("stop-color", 'black')
        //     .attr("stop-opacity", 0.1);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "40%")
            .attr("stop-color", 'transparent')
            .attr("stop-opacity", 0.7);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "45%")
            .attr("stop-color", 'transparent')
            .attr("stop-opacity", 1);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "60%")
            .attr("stop-color", 'transparent')
            .attr("stop-opacity", 0.7);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "70%")
            .attr("stop-color", 'transparent')
            .attr("stop-opacity", 0.3);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "80%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 0.1);

        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "85%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 0.3);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "92%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 0.5);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "95%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 0.5);
        circularGrad
            .append("stop")
            .attr("class", "end")
            .attr("offset", "100%")
            .attr("stop-color", 'black')
            .attr("stop-opacity", 0.3);

        container.append('svg:image')
            .attr('xlink:href', centrePanel)
            .attr("width", 122)
            .attr("height", 122)
            .attr("x", -61)
            .attr("y", -61)
        container.append('svg:image')
            .attr('xlink:href', spinTxt)
            .attr("width", 120)
            .attr("height", 60)
            .attr("x", -60)
            .attr("y", -40)
            .on("click", spin)
            .style({ "cursor": "pointer" });

    }, [])

    const spin = () => {
        startAudio();
        var index = 10;

        var ps = 360 / data.length;
        // debugger;
        var slectedIndex = (data.length - index) * ps;
        var rng = Math.floor(1 * slectedIndex + 360 * 10);

        rotation = Math.round(rng / ps) * ps;
        picked = Math.round(data.length - (rotation % 360) / ps);
        picked = picked >= data.length ? picked % data.length : picked;

        rotation += Math.round(ps / 2);

        vis
            .transition()
            .duration(10000)
            .attrTween("transform", rotTween)
            .each("end", function () {
                d3.select(".slice:nth-child(" + (picked + 1) + ") path");
                console.log(data[picked].value);
                oldrotation = rotation;
            });
        vis2
            .transition()
            .duration(10000)
            .attrTween("transform", rotTween)
            .each("end", function () {
                d3.select(".slice:nth-child(" + (picked + 1) + ") path");
                console.log(data[picked].value);
                oldrotation = rotation;
            });
    };

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
