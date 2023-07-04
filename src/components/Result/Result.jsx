import React from "react";
import { useLocation } from "react-router-dom";
import CanvasJSReact from "@canvasjs/react-charts";
import "./Result.scss";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Result = () => {
  const location = useLocation();
  const { student } = location.state;

  const options = {
    title: {
      text: "Student Subjects",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Web Development", y: student.subjects.Web_development },
          { label: "Data Structures", y: student.subjects.Data_Structures },
          { label: "Operating System", y: student.subjects.Operating_System },
          { label: "Computer Organisation", y: student.subjects.Computer_Organisation },
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Result</h2>
      <img src={student.avatar} alt="" />
      <p>Registration number:{student.reg_no}</p>
      <p>Student Name: {student.username}</p>
      <CanvasJSChart options={options} />
      {/* Render other relevant student data */}
    </div>
  );
};

export default Result;
