import React, {useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Questions from "../Questions/Questions";
import Summary from "../Summary/Summary";
import "./Quiz.scss";
import ThreeBackground from "../Threebackground/Threebackground";

export default function Quiz() {
  const location = useLocation();
  let { category, difficulty } = location.state;
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showBlankScreen, setShowBlankScreen] = useState(false);

  const fetchData = async () => {
    let categoryNo;
    console.log(difficulty);
    switch (category) {
      case "Geography":
        categoryNo = 22;
        break;
      case "Sports":
        categoryNo = 21;
        break;
      case "History":
        categoryNo = 23;
        break;
      case "Animals":
        categoryNo = 27;
        break;
      case "Film":
        categoryNo = 11;
        break;
      case "Books":
        categoryNo = 10;
        break;
      default:
        categoryNo = 0;
        break;
    }

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryNo}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, difficulty]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This is required for Chrome compatibility
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === 9) {
      setShowBlankScreen(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <div className="quiz">
      <ThreeBackground />
      <div className="quiz-content">
        {showBlankScreen ? (
          <Summary />
        ) : (
          <div className="questions">
            {data && (
              <Questions
                data={data.results[currentQuestionIndex]}
                index={currentQuestionIndex + 1}
                onNextQuestion={handleNextQuestion}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
