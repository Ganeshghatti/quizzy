import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./Summary.scss"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Summary() {
  let correctAnswer = localStorage.getItem("correctanswer");
  let score = parseInt(correctAnswer) * 10;

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Your Score",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: true,
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} : {y}%",
        dataPoints: [
          { y: score, label: "Correct Answers", color: "#2a0d82" }, 
          { y: 100 - score, label: "Wrong Answers", color: "#FF0000" }, 
        ],
      },
    ],
    chart: {
      borderThickness: 1, 
      borderColor: "#000000",
    },
  };

  return (
    <div className="summary-container">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Summary;
