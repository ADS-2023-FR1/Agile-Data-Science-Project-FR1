import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styling

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const addMovie = () => {
    if (movies.length < 2) {
      if (inputValue.trim() !== '') {
        setMovies([...movies, inputValue]);
        setInputValue('');
        setErrorMessage('');
      } else {
        setErrorMessage('Please enter a movie name');
      }
    } else {
      setErrorMessage('You can only add up to 5 movies');
    }
  };

  const getRecommendation = async () => {
    if (movies.length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/getRecommendation?title=${movies.join('&title=')}`);
        console.log(response); // Log the entire response object
  
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
  
        const data = await response.json();
        console.log(data); // Log the parsed JSON data
  
        setRecommendations(data.recommendation);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to get recommendations');
      }
    } else {
      setErrorMessage('Please add movies before getting recommendations');
    }
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
        <button onClick={addMovie}>Add Movie</button>
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
      <button onClick={getRecommendation} className="get-recommendation-button">
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
