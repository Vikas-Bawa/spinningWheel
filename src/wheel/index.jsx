import React, { useEffect, useRef } from "react";
import { data } from "../Constants";
import NFT from "../assets/NFTs/SMB Mythic 28 .png";
import applause from "../assets/applause.mp3";
import centrePanel from "../assets/centrePanel.png";
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
  var padding = { top: 20, right: 40, bottom: 20, left: 40 },
    w = 500 - padding.left - padding.right,
    h = 500 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20(); //category20c()

  var container;
  var vis;
  var innerCircle;

  const startAudio = () => {
    console.log("playing sound");
    new Audio(wheel).play();
    setTimeout(() => {
      console.log("winner....");
      new Audio(applause).play();
    }, 6000);
  };

  useEffect(() => {
    if (!onMountRef.current) return;
    onMountRef.current = false;
    var svg = d3
      .select("#chart")
      .append("svg")
      .data([data])
      .attr("width", w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom);
    svg
      .append("svg:image")
      .attr("xlink:href", frame)
      .attr("width", "497")
      .attr("height", "499")
      .attr("x", 0)
      .attr("y", 0);

    container = svg
      .append("g")
      .attr("class", "chartholder")
      .attr(
        "transform",
        "translate(" + (w / 2 + padding.left - 1) + "," + (h / 2 + padding.top + 13) + ")"
      );
    vis = container.append("g");

    var pie = d3.layout
      .pie()
      .sort(null)
      .value(function (d) {
        return 1;
      });
    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r).innerRadius(0);
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("g").attr("class", "slice");

    arcs
      .append("path")
      .attr("fill", function (d, i) {
        return color(i);
      })
      // .attr("fill", function (d, i) {
      //     return "url(#wedgeImg" + (i + 1) + ")";
      // })
      .attr("d", function (d) {
        console.log(arc(d));
        return arc(d);
      });
    //   .on("mouseover", function (d) {
    //     d3.select(this.parentNode)
    //       .transition()
    //       .duration("500")
    //       .attr("transform", function (d) {
    //         return "scale(1.1)";
    //       });
    //   })
    //   .on("mouseout", function (d) {
    //     d3.select(this.parentNode)
    //       .transition()
    //       .duration("500")
    //       .attr("transform", function (d) {
    //         return "scale(1)";
    //       });
    //   });

    var arc2 = d3.svg.arc().outerRadius(r).innerRadius(170);
    // var arcs2 = vis.selectAll("g.slice")
    //     .data(pie)
    //     .enter()
    //     .append("g")
    //     .attr("class", "slice");
    arcs
      .append("path")
      .attr("fill", "rgba(0,0,0,0.1)")
      .attr("d", function (d) {
        console.log(arc2(d));
        return arc2(d);
      })

      .attr("stroke", "black")
      .attr("stroke-width", "0.5")
      //   .on("mouseover", function (d) {
      //     d3.select(this.parentNode)
      //       .transition()
      //       .duration("500")
      //       .attr("transform", function (d) {
      //         return "scale(1.1)";
      //       });
      //   })
      //   .on("mouseout", function (d) {
      //     d3.select(this.parentNode)
      //       .transition()
      //       .duration("500")
      //       .attr("transform", function (d) {
      //         return "scale(1)";
      //       });
      //   })
      .attr("stroke-dasharray", "2 2");
    arcs
      .append("svg:image")
      .attr("xlink:href", function (d, i) {
        return leftLine;
      })
      .attr("width", 8)
      .attr("height", 200)
      .attr("x", -2)
      .attr("y", 0)
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          (d.startAngle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          -d.outerRadius +
          ")"
        );
      });
    arcs
      .append("svg:image")
      .attr("xlink:href", function (d, i) {
        return rightLine;
      })
      .attr("width", 8)
      .attr("height", 200)
      .attr("x", -6)
      .attr("y", 0)
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" + (d.endAngle * 180) / Math.PI + ")translate(" + 0 + ", " + -d.outerRadius + ")"
        );
      });
    // square image
    arcs
      .append("svg:image")
      .attr("xlink:href", function (d, i) {
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
        return (
          "rotate(" +
          (d.angle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          (-d.outerRadius + 35) +
          ")"
        );
      });
    //   .on("mouseover", function (d) {
    //     d3.select(this.parentNode)
    //       .transition()
    //       .duration("500")
    //       .attr("transform", function (d) {
    //         return "scale(1.1)";
    //       });
    //   })
    //   .on("mouseout", function (d) {
    //     d3.select(this.parentNode)
    //       .transition()
    //       .duration("500")
    //       .attr("transform", function (d) {
    //         return "scale(1)";
    //       });
    //   });

    // NFT image
    arcs
      .append("svg:image")
      .attr("xlink:href", function (d, i) {
        return NFT;
      })
      .attr("width", 30)
      .attr("height", 30)
      .attr("x", -15)
      .attr("y", 0)
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          (d.angle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          (-d.outerRadius + 50) +
          ")"
        );
      })
      .attr("style", "opacity:0.5;");
    //   .on("mouseover", function (d) {
    //     d3.select(this.parentNode)
    //       .transition()
    //       .duration("500")
    //       .attr("transform", function (d) {
    //         return "scale(1.1)";
    //       });
    //   })
    //   .on("mouseout", function (d) {
    //     d3.select(this.parentNode)
    //       .transition()
    //       .duration("500")
    //       .attr("transform", function (d) {
    //         return "scale(1)";
    //       });
    //   });
    // .attr("transform-origin", "top left")
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
    arcs
      .append("defs")
      .append("radialGradient")
      .attr("id", function (d, i) {
        return "grad" + (i + 1);
      })
      .attr("cx", "0%")
      .attr("cy", "0%")
      .attr("r", "100%")
      .attr("fx", "0%")
      .attr("fy", "100%");

    arcs
      .append("text")
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        console.log(
          "d.startAngle: " + d.startAngle + "d.endAngle: " + d.endAngle + "dangle : ",
          (d.angle * 180) / Math.PI
        );
        return (
          "rotate(" +
          (d.angle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          -(d.outerRadius - 20) +
          ")"
        );
      })
      .attr("text-anchor", "middle")
      .text(function (d, i) {
        return data[i].label;
      })
      .style({ "font-size": "0.5em", "font-weight": "700", fill: "white" });

    //make pointer
    svg
      .append("svg:image")
      .attr("xlink:href", pointer)
      .attr("width", 60)
      .attr("height", 80)
      .attr("x", 219)
      .attr("y", 10);

    //draw spin circle

    innerCircle = container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 60)
      .style({ fill: "white", cursor: "pointer" });
    //spin text
    // innerCircle.on("click", spin);
    container
      .append("svg:image")
      .attr("xlink:href", centrePanel)
      .attr("width", 122)
      .attr("height", 122)
      .attr("x", -61)
      .attr("y", -61);
    container
      .append("svg:image")
      .attr("xlink:href", spinTxt)
      .attr("width", 120)
      .attr("height", 60)
      .attr("x", -60)
      .attr("y", -40)
      .on("click", spin)
      .style({ cursor: "pointer" });

    // container.append("text")
    //     .attr("x", 0)
    //     .attr("y", 12)
    //     .attr("text-anchor", "middle")
    //     .text("SPIN")
    //     .style({ "font-weight": "bold", "font-size": "30px" });
  }, []);

  const spin = () => {
    startAudio();
    var index = 21;

    var ps = 360 / data.length;
    console.log("Ps for single ", ps);

    var slectedIndex = (data.length - index) * ps;
    var rng = Math.floor(1 * slectedIndex + 360);

    rotation = Math.round(rng / ps) * ps;
    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? picked % data.length : picked;

    rotation += Math.round(ps / 2);

    vis
      .transition()
      .duration(6000)
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
  );
}

export default Wheel;
