import React, { useState } from 'react';
import '../style/App.css';
import {addMovie, getRecommendation, searchChange,suggestionClick, } from './utils'; // Import functions from utils.js
import movieData from './movie.json'; // Import movie.json file

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleAddMovie = () => {
    addMovie(movies, setMovies, inputValue, setInputValue, setErrorMessage);
  };

  const handleGetRecommendation = async () => {
    getRecommendation(movies, setRecommendations, setErrorMessage);
  };

  const handleSearchChange = (e) => {
    searchChange(e, setInputValue, setSuggestions, movieData);
  };

  const handleSuggestionClick = (suggestion) => {
    suggestionClick(suggestion, setInputValue, setSuggestions);
  };

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Movie Recommendation System</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter five movies that you have seen and you enjoy"
          value={inputValue}
          onChange={handleSearchChange}
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <div>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.title}
            </li>
          ))}
        </ul>
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
