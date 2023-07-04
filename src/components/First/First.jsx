import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./First.scss";
import Category from "../Category/Catergory";
import easy from "../../Assets/Images/easy.png";
import medium from "../../Assets/Images/medium.png";
import hard from "../../Assets/Images/hard.png";

export default function First() {
  const [regno, setRegno] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const categories = [
    "Books",
    "Film",
    "Geography",
    "Sports",
    "History",
    "Animals",
  ];
  const difficulties = ["easy", "medium", "hard"];
  const difficultyImages = [easy, medium, hard];
  const pointValues = ["10", "20", "30"]; // Point values for each difficulty level

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    navigate(`/Quiz/:${selectedCategory}`, {
      state: { category: selectedCategory, difficulty: difficulty },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (regno) {
      try {
        const response = await axios.post("http://localhost:5000/first", {
          regno: regno,
        });
        const student = response.data.student;
        navigate("/Result", { state: { student: student } });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="Start">
      {!selectedCategory && (
        <div className="select-category">
          <h2>Select a category:</h2>
          <div className="categories">
            {categories.map((item, index) => (
              <Category
                category={item}
                key={index}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      )}

      {selectedCategory && !selectedDifficulty && (
        <div className="select-difficulty">
          <h2>Select a difficulty:</h2>
          <div className="difficulties">
            {difficulties.map((item, index) => (
              <div key={index}>
                <div className="difficulty-text">
                  <div className="difficulty-radio">
                    <input
                      type="radio"
                      id={item}
                      name="difficulty"
                      value={item}
                      onChange={(e) => handleDifficultySelect(e.target.value)}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                  <p className="point-value">
                    Each correct answer is rewarded with {pointValues[index]}
                    points
                  </p>
                </div>
                <div>
                  <label htmlFor={item}>
                    <img
                      className="difficulty-img"
                      src={difficultyImages[index]}
                      alt={item}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <p>These points will be used to form leaderboard</p>
        </div>
      )}

      {selectedCategory && selectedDifficulty && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter reg.no"
            value={regno}
            onChange={(e) => {
              setRegno(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
