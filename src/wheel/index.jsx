/* global d3 */
import { useEffect, useRef } from "react";
import { data } from "../Constants";
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
  var padding = { top: 10, right: 50, bottom: 10, left: 50 },
    w = 520 - padding.left - padding.right,
    h = 520 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000;

  var vis;
  let pinGroup;

  const startAudio = () => {
    console.log("playing sound");
    new Audio(wheel).play();
    setTimeout(() => {
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
      .attr("width", "515")
      .attr("height", "515")
      .attr("x", 0)
      .attr("y", 0);

    var container = svg
      .append("g")
      .attr("class", "chartholder")
      .attr(
        "transform",
        "translate(" + (w / 2 + padding.left - 2) + "," + (h / 2 + padding.top + 12) + ")"
      );
    vis = container.append("g");

    var pie = d3.layout
      .pie()
      .sort(null)
      .value(function () {
        return 1;
      });
    // declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r).innerRadius(0);
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("g").attr("class", "slice");
    // Create the filter for the inner shadow

    arcs
      .append("path")
      .attr("fill", function (d, i) {
        return d.data.color;
      })

      .attr("d", function (d) {
        return arc(d);
      });
    arcs
      .append("path")
      //.attr("fill", "url(#sliceGradient)") // Apply the gradient
      .attr("d", function (d) {
        return arc(d);
      })
      .style("filter", function (d, i) {
        // Create a filter for the slice edges
        // Create a filter for the inner shadow effect
        var filter = svg
          .append("filter")
          .attr("id", "inner-shadow-" + i)
          .attr("x", "-50%")
          .attr("y", "-50%")
          .attr("width", "200%")
          .attr("height", "200%");

        // Create a feGaussianBlur element for the blur effect
        filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", "15");

        // Create a feOffset element to offset the shadow
        filter.append("feOffset").attr("dx", "0").attr("dy", "0").attr("result", "offsetBlur");

        // Create a feComposite element to combine the blurred and original shapes
        var composite = filter
          .append("feComposite")
          .attr("operator", "out")
          .attr("in", "SourceGraphic")
          .attr("in2", "offsetBlur")
          .attr("result", "inverse");

        // Create a feFlood element to apply the color
        filter
          .append("feFlood")
          .attr("flood-color", function () {
            console.log("d", d);
            return d.data.shadow;
          })
          .attr("flood-opacity", "1")
          .attr("result", "color");

        // Create a feComposite element to combine the color and original shapes
        filter
          .append("feComposite")
          .attr("operator", "in")
          .attr("in", "color")
          .attr("in2", "inverse")
          .attr("result", "shadow");

        // Apply the filter to the path element
        return "url(#inner-shadow-" + i + ")";
      });

    var arc2 = d3.svg.arc().outerRadius(r).innerRadius(170);
    var arc3 = d3.svg.arc().outerRadius(170).innerRadius(170);

    arcs
      .append("path")
      .attr("d", function (d) {
        return arc2(d);
      })
      .attr("fill", function () {
        let outerGradient = container
          .append("radialGradient")
          .attr("id", "outerGrad")
          .attr("r", "90%");
        outerGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("style", "stop-color:rgba(0,0,0,0.4);stop-opacity:1");
        outerGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("style", "stop-color:transparent;stop-opacity:1");

        return "url(#outerGrad)";
      });

    arcs
      .append("path")
      .attr("fill", "rgba(0,0,0,1)")
      .attr("d", function (d) {
        return arc3(d);
      })
      .attr("stroke", "rgba(0,0,0,0.3)")
      .attr("stroke-width", "0.5")
      .attr("stroke-dasharray", "2 2");

    arcs
      .append("svg:image")
      .attr("xlink:href", function () {
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
        return (
          "rotate(" +
          (d.startAngle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          (-d.outerRadius - 8) +
          ")"
        );
      });
    arcs
      .append("svg:image")
      .attr("xlink:href", function () {
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
        return (
          "rotate(" +
          (d.endAngle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          (-d.outerRadius - 8) +
          ")"
        );
      });
    // square image
    arcs
      .append("svg:image")
      .attr("xlink:href", function () {
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
        return (
          "rotate(" +
          (d.angle * 180) / Math.PI +
          ")translate(" +
          0 +
          ", " +
          -(d.outerRadius - 15) +
          ")"
        );
      })
      .attr("text-anchor", "middle")
      .text(function (d, i) {
        return data[i].label;
      })
      .style({ "font-size": "0.7em", "font-weight": "700", fill: "white" });
    arcs
      .append("text")
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
          -(d.outerRadius - 30) +
          ")"
        );
      })
      .attr("text-anchor", "middle")
      .text(function (d, i) {
        return data[i].value;
      })
      .style({ "font-size": "0.7em", "font-weight": "700", fill: "rgba(0,0,0,0.5)" });

    //make pointer
    pinGroup = container
      .append("g")
      .attr("x", 0) // Adjust the x-coordinate to align the bottom of the image with the rotation pivot
      .attr("y", 0)
      .attr("class", "pin-group")
      .attr("transform", "translate(0, -240)"); // Set the initial position of the pin

    // Add the pin image to the group

    pinGroup
      .append("image")
      .attr("xlink:href", pointer) // URL of the pin image
      .attr("width", 60) // Pin width
      .attr("height", 80) // Pin height
      .attr("x", -30) // Adjust the x-coordinate to align the bottom of the image with the rotation pivot
      .attr("y", -25) // Set the y-coordinate to 0, as the position is controlled by the group transform
      .style("transform-origin", "center top") // Set the transform origin to the bottom center of the image
      .style("transform-box", "fill-box") // Set the transform box to fill-box for proper rotation
      .attr("transform", "rotate(0)"); // Set the initial rotation angle
    pinGroup
      .append("circle")
      .attr("cx", 0.5) // Set the x-coordinate of the rotation pivot
      .attr("cy", 1) // Set the y-coordinate of the rotation pivot
      .attr("x", 0) // Adjust the x-coordinate to align the bottom of the image with the rotation pivot
      .attr("y", 0) //
      .style("transform-origin", "center") // Set the transform origin to the bottom center of the image
      .attr("r", 20) // Set the radius of the rotation pivot (0 to make it invisible)
      .attr("fill", "rgba(0,0,0,0)");
    //draw spin circle
    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 210)
      .style({ fill: "url(#circularGradient)", cursor: "pointer" });

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
      .attr("stop-opacity", 0.4);

    circularGrad
      .append("stop")
      .attr("class", "start")
      .attr("offset", "40%")
      .attr("stop-color", "transparent")
      .attr("stop-opacity", 0.3);
    circularGrad
      .append("stop")
      .attr("class", "start")
      .attr("offset", "50%")
      .attr("stop-color", "transparent")
      .attr("stop-opacity", 0.2);

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
  });
  let currnetIndex = 0;

  //Trigger to spin the wheel
  const spin = () => {
    startAudio();

    var ps = 360 / data.length;

    var slectedIndex = (data.length - currnetIndex) * ps;
    var rng = Math.floor(5 * slectedIndex + 360);

    rotation = Math.round(rng / ps) * ps;
    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? picked % data.length : picked;
    maxAngle = 0;
    rotation += Math.round(ps / 2);

    isRotating = true;
    console.log("Rotation ", rotation);
    console.log("oldRotation ", oldrotation);

    // rotatePin();
    vis
      .transition()
      .duration(6000)
      // .ease("bouncein")
      .attrTween("transform", rotTween)
      .each("end", function () {
        d3.select(".slice:nth-child(" + (picked + 1) + ") path");
        console.log(data[picked].value);
        oldrotation = rotation;
        isRotating = false;
        // updateRotationAngle(0);
        ++currnetIndex;
      });
  };

  function calculatePercentage(part, total) {
    // console.log("Part totoal", part, total);
    return (part / total) * 100;
  }
  // currentRotation = 0;
  function rotTween() {
    var i = d3.interpolate(oldrotation % 360, rotation);
    rotatePin(0);
    return function (t) {
      var currentRotation = i(t);
      rotatePin(currentRotation);
      return "rotate(" + -currentRotation + ")";
    };
  }
  var angle = 0; // Initial angle
  var maxAngle = 0; // Maximum angle to rotate
  var isRotating = true; // Flag to indicate if rotation should continue

  function rotatePin(progess) {
    var duration = 100; // Duration of the transition in milliseconds
    var easing = "linear"; // Easing function for the transition

    let toBeMoved = 0;
    if (progess) {
      let percentageCompleted = calculatePercentage(Math.round(progess), Math.round(rotation));

      if (percentageCompleted < 3) {
        toBeMoved = 5;
      } else if (percentageCompleted < 10) {
        toBeMoved = 10;
      } else if (percentageCompleted < 20) {
        toBeMoved = 20;
      } else if (percentageCompleted < 30) {
        toBeMoved = 30;
      } else if (percentageCompleted > 30 && percentageCompleted < 80) {
        toBeMoved = 45;
      } else if (percentageCompleted < 90) {
        toBeMoved = 20;
      } else if (percentageCompleted < 95) {
        toBeMoved = 10;
      } else if (percentageCompleted > 95) {
        toBeMoved = 3;
      }
      if (toBeMoved == maxAngle) {
        return;
      }

      maxAngle = toBeMoved;
    }

    // maxAngle = toBeMoved ? toBeMoved : maxAngle;
    console.log("MAx angle", maxAngle);
    // Rotate the pin to the maximum angle
    pinGroup
      .transition()
      .duration(duration)
      .ease(easing)
      .attr("transform", "translate(-0, -240) rotate(" + maxAngle + ")")
      .each("end", function () {
        pinGroup
          .transition()
          .duration(duration)
          .ease(easing)
          .attr("transform", "translate(-0, -240) rotate(0)")
          .each("end", function () {
            if (angle > maxAngle && isRotating) {
              rotatePin();
            }
          });
      });

    // Update the rotation angle
    angle += 90; // Change this value to adjust the rotation increment
  }
  return (
    <>
      <div id="chart"></div>
    </>
  );
}

export default Wheel;
