import React, { useState, useEffect } from "react";
import "./Questions.scss";

export default function Questions({ data, index, onNextQuestion }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const combinedOptions = [data.correct_answer, ...data.incorrect_answers];
    const shuffledOptions = shuffleArray(combinedOptions);
    setOptions(shuffledOptions);
  }, [data]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setErrorMessage("");
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === data.correct_answer) {
        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
        localStorage.setItem("correctanswer", correctAnswers);
      }
      onNextQuestion();
      setSelectedOption(null);
      setErrorMessage("");
    } else {
      setErrorMessage("Please select an option.");
    }
  };
  return (
    <div className="question">
      <h1>{data.category}</h1>
      <h3>Question {index}/10</h3>
      <p className="question-text">{data.question}</p>
      <ul>
        {options.map((option, optionIndex) => (
          <li key={optionIndex}>
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      {errorMessage && <h4 className="error-message">{errorMessage}</h4>}
      <button className="next" onClick={handleNextQuestion}>
        Next
      </button>
    </div>
  );
}
