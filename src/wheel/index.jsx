import React, { useEffect, useRef } from 'react';
import { data } from '../Shared/Constants';
import { CommonGlitter, Common_NFT_Border } from '../Shared/Images';
import wonNFT from "../assets/NFTs/SMB Epic 466.png";
import applause from "../assets/applause.mp3";
import centrePanel from "../assets/centrePanel.png";
import diamond from "../assets/diamond.png";
import diamondGlow from "../assets/diamondGlow.png";
import frame from "../assets/frame.png";
import leftLine from "../assets/leftLine.png";
import pointer from "../assets/pointer.png";
import rightLine from "../assets/rightLine.png";
import spinTxt from "../assets/spin.png";
import square from "../assets/square.png";
import wheel from "../assets/wheel.mp3";
import "./style.css";

function Wheel() {
    const onMountRef = useRef(true);
    var padding = { top: 30, right: 50, bottom: 10, left: 50 },
        w = 530 - padding.left - padding.right,
        h = 530 - padding.top - padding.bottom,
        r = Math.min(w, h) / 2,
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scale.category20();//category20c()
    var container;
    var vis;
    var innerCircle;
    var pointerImg;
    let pointerSpark;
    var spinText;
    var lights;
    var winNFT;
    var winEffect;
    let NFT_BorderEffect;
    let sparkEffect;
    const startAudio = () => {
        new Audio(wheel).play();
        setTimeout(() => {
            new Audio(applause).play();
        }, 6000);
    }
    useEffect(() => {
        if (!onMountRef.current) return;
        onMountRef.current = false;
        var svg = d3
            .select("#chart")
            .append("svg")
            .data([data])
            .attr("width", w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        svg.append('svg:image')
            .attr('xlink:href', frame)
            .attr("width", '525')
            .attr("height", '525')
            .attr("x", 0)
            .attr("y", 10)
        container = svg.append("g")
            .attr("class", "chartholder")
            .attr(
                "transform",
                "translate(" + (w / 2 + padding.left - 2) + "," + (h / 2 + padding.top + 12) + ")"
            );
        vis = container.append("g");
        // const createGradient = (select) => {
        //     return svg
        //         .append("radialGradient")
        //         .attr("id", `svgGradient` + select)
        //         .attr("x1", "0%")
        //         .attr("x2", "0%")
        //         .attr("y1", "0%")
        //         .attr("cx", "35%") //Move the x-center location towards the left
        //         .attr("cy", "0%") //Move the y-center location towards the top
        //         .attr("r", "60%")
        //         .attr("y2", "0%");
        // };
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
        arcs.append("path")
            .attr("fill", function (d, i) { return color(i); })
            // .attr("fill", function (d, i) {
            //     return "url(#wedgeImg" + (i + 1) + ")";
            // })
            .attr("d", function (d) { return arc(d); })

        // arcs
        //     .append("path")
        //     .attr("fill", function (d, i) {
        //         let gardient = createGradient(i);
        //         gardient
        //             .append("stop")
        //             .attr("class", "start")
        //             .attr("offset", "0%")
        //             .attr("stop-color", "#ffffff")
        //             .attr("stop-opacity", 1);
        //         gardient
        //             .append("stop")
        //             .attr("class", "end")
        //             .attr("offset", "100%")
        //             .attr("stop-color", function () {
        //                 return d.data.color;
        //             })
        //             .attr("stop-opacity", 1);
        //         return "url(#svgGradient" + i + ")";
        //     })

        // .on("mouseover", function (d) {
        //     d3.select(this.parentNode).transition()
        //         .duration('500')
        //         .attr("transform", function (d) {
        //             return "scale(1.1)";
        //         })
        // }).on("mouseout", function (d) {
        //     d3.select(this.parentNode).transition()
        //         .duration('500')
        //         .attr("transform", function (d) {
        //             return "scale(1)";
        //         })
        // })


        var arc2 = d3.svg.arc()
            .outerRadius(r)
            .innerRadius(170);
        // var arcs2 = vis.selectAll("g.slice")
        //     .data(pie)
        //     .enter()
        //     .append("g")
        //     .attr("class", "slice");
        arcs.append("path")
            .attr("fill", function (d, i) {
                let outerGradient = container.append('radialGradient')
                    .attr('id', 'outerGrad')
                    .attr('r', '80%')
                outerGradient.append('stop')
                    .attr('offset', '0%')
                    .attr('style', 'stop-color:rgba(0,0,0,0.4);stop-opacity:1')
                outerGradient.append('stop')
                    .attr('offset', '100%')
                    .attr('style', 'stop-color:transparent;stop-opacity:1')

                return 'url(#outerGrad)';
            })
            .attr("d", function (d) { return arc2(d); })
        // .attr('stroke', 'black')
        // .attr('stroke-width', '0.5')


        var arc3 = d3.svg.arc()
            .outerRadius(170)
            .innerRadius(170);
        arcs.append("path")
            .attr("fill", 'rgba(0,0,0,1)')
            .attr("d", function (d) { return arc3(d); })
            .attr("stroke", 'rgba(0,0,0,0.3)')
            .attr("stroke-width", '0.5')
            .attr('stroke-dasharray', '2 2')
        // .attr('stroke', 'grey')
        arcs.append('svg:image')
            .attr('xlink:href', leftLine)
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
        arcs.append('svg:image')
            .attr('xlink:href', rightLine)
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
        arcs.append('svg:image')
            .attr('xlink:href', square)
            .attr("width", 10)
            .attr("height", 10)
            .attr("x", -5)
            .attr("y", 0)
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + ((d.angle * 180) / Math.PI) + ")translate(" + (0) + ', ' + (-d.outerRadius + 40) + ")";
            })
        // arcs.append('svg:image')
        //     .attr('xlink:href', diamondGlow)
        //     .attr("width", 10)
        //     .attr("height", 10)
        //     .attr("x", -5)
        //     .attr("y", 0)
        //     .attr("transform", function (d) {
        //         d.innerRadius = 0;
        //         d.outerRadius = r;
        //         d.angle = (d.startAngle + d.endAngle) / 2;
        //         return "rotate(5)translate(" + (0) + ', ' + (-d.outerRadius + 40) + ")";
        //     })
        // .on("mouseover", function (d) {
        //     d3.select(this.parentNode).transition()
        //         .duration('500')
        //         .attr("transform", function (d) {
        //             return "scale(1.1)";
        //         })
        // }).on("mouseout", function (d) {
        //     d3.select(this.parentNode).transition()
        //         .duration('500')
        //         .attr("transform", function (d) {
        //             return "scale(1)";
        //         })
        // });
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
        arcs.append("defs")
            .attr('id', 'unknown')
            .attr('id', function (d, i) { return 'grad' + (i + 1) })
            .attr('cx', '0%')
            .attr('cy', '0%')
            .attr('r', '100%')
            .attr('fx', '0%')
            .attr('fy', '100%')
            // arcs.append("text")
            //     .attr("transform", function (d) {
            //         d.innerRadius = 0;
            //         d.outerRadius = r;
            //         d.angle = (d.startAngle + d.endAngle) / 2;
            //         return "rotate(" + (d.angle * 180 / Math.PI) + ")translate(" + (0) + ', ' + (-(d.outerRadius - 15)) + ")";
            //     })
            .attr("d", function (d) {
                return arc(d);
            });
        // .attr("fill", function (d, i) {
        //   // return d.data.color;
        // });

        var arc2 = d3.svg.arc().outerRadius(r).innerRadius(170);

        arcs
            .append("path")
            .attr("fill", "rgba(0,0,0,0.1)")
            .attr("d", function (d) {
                return arc2(d);
            });

        var arc3 = d3.svg.arc().outerRadius(170).innerRadius(170);
        arcs
            .append("path")
            .attr("fill", "rgba(0,0,0,1)")
            .attr("d", function (d) {
                return arc3(d);
            })
        arcs.append("text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI) + ")translate(" + (0) + ', ' + (-(d.outerRadius - 15)) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                return data[i].label;
            })
            .style({ "font-size": "0.7em", "font-weight": "700", 'fill': 'white' })
        arcs.append("text")
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
            .style({ "font-size": "0.7em", "font-weight": "700", 'fill': 'rgba(0,0,0,0.5)' })
        //make pointer
        pointerImg = svg.append('svg:image')
            .attr('xlink:href', pointer)
            .attr("width", 60)
            .attr("height", 80)
            .attr("x", 233)
            .attr("y", 0)
        // pointerSpark = svg.append('svg:image')
        //     .attr('id', 'sparkingPointer')
        //     .attr('xlink:href', wonNFT)
        //     .attr("width", 50)
        //     .attr("height", 50)
        //     .attr("x", 0)
        //     .attr("y", 0)

        //lights on the frame
        for (let angle = 0; angle <= 360; angle += 30) {
            container.append('svg:image')
                .attr('xlink:href', diamond)
                .attr("width", function (d) {
                    return (angle % 90 === 0) ? 15 : 10;
                })
                .attr("height", function (d) {
                    return (angle % 90 === 0) ? 15 : 10;
                })
                .attr("x", -7)
                .attr("y", 0)
                .attr("transform", function (d) {
                    return (angle % 90 === 0) ? "rotate(" + angle + ") translate(0,-238)" : "rotate(" + angle + ") translate(0,-235)";
                })
            lights = container.append('svg:image')
                .attr('xlink:href', diamondGlow)
                .attr("width", function (d) {
                    return (angle % 90 === 0) ? 30 : 22;
                })
                .attr("height", function (d) {
                    return (angle % 90 === 0) ? 30 : 22;
                })
                .attr("x", -7)
                .attr("y", 0)
                .attr("transform", function (d) {
                    return (angle % 90 === 0) ? "rotate(" + angle + ") translate(-7,-246)" : "rotate(" + angle + ") translate(-6,-241)";
                })
        }

        //draw spin circle
        innerCircle = container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 210)
            .style({ fill: "url(#circularGradient)", cursor: "pointer" });
        //spin text
        let circularGrad = container.append("radialGradient").attr("id", "circularGradient");
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "0%")
            .attr("stop-color", "black")
            .attr("stop-opacity", 1);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "30%")
            .attr("stop-color", "black")
            .attr("stop-opacity", 0.2);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "40%")
            .attr("stop-color", "transparent")
            .attr("stop-opacity", 0.7);
        circularGrad
            .append("stop")
            .attr("class", "start")
            .attr("offset", "45%")
            .attr("stop-color", "transparent")
            .attr("stop-opacity", 1);

        container
            .append("svg:image")
            .attr("xlink:href", centrePanel)
            .attr("width", 122)
            .attr("height", 122)
            .attr("x", -61)
            .attr("y", -61);
        spinText = container
            .append("svg:image")
            .attr("xlink:href", spinTxt)
            .attr("width", 100)
            .attr("height", 60)
            .attr("x", -50)
            .attr("y", -40)
            .on("click", spin)
            .style({ "cursor": "pointer" });


        // winNFT = container.append('svg:image')
        //     .attr('xlink:href', wonNFT)
        //     .attr("width", 200)
        //     .attr("height", 200)
        //     .attr("x", -100)
        //     .attr("y", -140)
        // container.append("text")
        //     .attr("x", 0)
        //     .attr("y", 12)
        //     .attr("text-anchor", "middle")
        //     .text("SPIN")
        //     .style({ "font-weight": "bold", "font-size": "30px" });
    }, [])


    const spin = () => {
        startAudio();
        spinText.on("click", null);
        var index = 3;
        var ps = 360 / data.length;

        var slectedIndex = (data.length - index) * ps;
        var rng = Math.floor(1 * slectedIndex + 360 * 5);

        rotation = Math.round(rng / ps) * ps;
        picked = Math.round(data.length - (rotation % 360) / ps);
        picked = picked >= data.length ? (picked % data.length) : picked;

        rotation += Math.round(ps / 2);

        vis
            .transition()
            .duration(10000)
            .attrTween("transform", rotTween)
            .each("end", function () {
                d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                oldrotation = rotation;
                /* Get the result value from object "data" */
                console.log(data[picked].label)
                winNFT = container.append('svg:image')
                    .attr('xlink:href', wonNFT)
                    .attr("width", 0)
                    .attr("height", 0)
                    .attr("x", 0)
                    .attr("y", 0)
                    .transition()
                    .duration(1000)
                    .attr("width", 200)
                    .attr("height", 200)
                    .attr("x", -100)
                    .attr("y", -140)

                winEffect = container.append('svg:image')
                    .attr('id', 'glitter')
                    .attr("x", -250)
                    .attr("y", -350)
                    .attr("width", 500)
                    .attr("height", 500)
                    .attr("xlink:href", CommonGlitter[0])
                NFT_BorderEffect = container.append('svg:image')
                    .attr('id', 'NFT_Border')
                    .attr("x", -125)
                    .attr("y", -165)
                    .attr("width", 250)
                    .attr("height", 250)
                    .attr('xlink:href', Common_NFT_Border[0])
                let idx = 0;
                let winningAnimation;
                setTimeout(() => {
                    winningAnimation = setInterval(() => {
                        idx += 1;
                        if (idx < CommonGlitter.length)
                            winEffect.attr('xlink:href', CommonGlitter[idx])
                        if (idx < Common_NFT_Border.length)
                            NFT_BorderEffect.attr('xlink:href', Common_NFT_Border[idx])
                    }, 10);
                }, 1000);
                setTimeout(() => {
                    clearInterval(winningAnimation);
                }, 5000);

                /* Comment the below line for restrict spin to single time */
                spinText.on("click", spin);
            });
        function tween(d, i, a) {
            return d3.interpolateString("rotate(-60, 150, 130)  translate(-25px, 87px);", "rotate(-20) translate(-27px, 87px);");
        }
        turnNeedle();
        function turnNeedle() {

            pointerImg
                .transition()
                .duration(2000)
            // .attrTween("transform", tween);


        }

    }


    function rotTween() {
        var i = d3.interpolate(oldrotation % 360, rotation);
        return function (t) {
            return "rotate(" + i(t) + ")";
        };
    }
    return (
        <>
            <div id="chart"></div>
        </>
    );
}
export default Wheel
