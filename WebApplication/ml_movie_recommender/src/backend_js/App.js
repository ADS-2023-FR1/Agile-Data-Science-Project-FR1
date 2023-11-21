import React, { useState } from 'react';
import '../style/App.css';
import { addMovie, getRecommendation } from './movie'; // Import functions from movieFunctions.js

//Look at readme in WebApplication for instruction on how to run
function MovieList() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleAddMovie = () => {
    addMovie(movies, setMovies, inputValue, setInputValue, setErrorMessage);
  };

  const handleGetRecommendation = async () => {
    getRecommendation(movies, setRecommendations, setErrorMessage);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Movie Recommendation System</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter five movies that you have seen and you enjoy"
          value={inputValue}
          onChange={handleChange}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="movie-list">
        <h2>Movie List:</h2>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleGetRecommendation} className="get-recommendation-button">
        Get Recommendation
      </button>
      {recommendations.length > 0 && (
        <div className="recommended-movies">
          <h2>Recommended Movies:</h2>
          <ul>
            {recommendations.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieList;
