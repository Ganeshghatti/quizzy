import React from "react";
import "./Category.scss";
import books from "../../Assets/Images/books.png";
import film from "../../Assets/Images/film.png";
import animals from "../../Assets/Images/animals..jpg"
import geography from "../../Assets/Images/geography.png"
import sports from "../../Assets/Images/sports.jpg";
import history from "../../Assets/Images/history.png"

const Category = ({ category, onClick }) => {
  const categories = ["Books", "Film", "Geography", "Sports", "History", "Animals"];
  const images = [books, film,geography,sports,history,animals];

  const categoryIndex = categories.indexOf(category);

  const handleClick = () => {
    onClick(category);
  };

  return (
    <div className="box">
      <img src={images[categoryIndex]} alt="" />
      <div className="category" onClick={handleClick}>
        <button className="select-category-button">{category}</button>
      </div>
    </div>
  );
};

export default Category;
