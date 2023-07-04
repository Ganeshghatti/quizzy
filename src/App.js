import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./components/First/First";
import Result from "./components/Result/Result";
import Quiz from "./components/Quiz/Quiz";
import Landing from "./components/Landing/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Start" element={<First />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Quiz/:selectedcategory" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}
