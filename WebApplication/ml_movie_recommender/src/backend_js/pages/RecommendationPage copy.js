import React, { useState } from 'react';
import './../../style/recommendation.css';
import './../../style/error.css';
import Header from '../components/HeaderComponent';
import InputComponent from '../components/InputComponent';
import ErrorComponent from '../components/ErrorComponent';
import RecommendedMovies from '../components/RecommendedComponent';
import Suggestions from '../components/SuggestionsComponent';
import MovieDisplay from '../components/MovieDisplayComponent';
//Import functionality/behaviour
import {
  addMovie,
  getRecommendation,
  searchChange,
  suggestionClick,
} from '../utils';
import movieData from '../movieTitle.json'; //data used for movie suggestion

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState(6);

  const handleRemoveMovie = (index) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  };

  const handleShowMore = () => {
    setMoviesToShow(moviesToShow + 6);
  };

  const handleAddMovie = () => {
    addMovie(movies, setMovies, inputValue, setInputValue, setErrorMessage);
  };

  const handleDeleteMovie = (id) => {
    setMovies( currentMovies => currentMovies.filter( movie => movie.movieId !== id));
  };

  const handleGetRecommendation = async () => {
    setMoviesToShow(5);
    getRecommendation(movies, setRecommendations, setErrorMessage);
  };

  const handleSearchChange = (e) => {
    searchChange(e, setInputValue, setSuggestions, movieData);
  };

  const handleSuggestionClick = (suggestion) => {
    suggestionClick(suggestion, setInputValue, setSuggestions, movies, setMovies, setErrorMessage);
    //handleAddMovie();
    //addMovie(movies, setMovies, inputValue, setInputValue, setErrorMessage);
  };

  return (
    <>
      <Header />
      <div className="movie-list-container">
        <h1 className="movie-list-title">Movie Recommendation System</h1>
        <InputComponent
          inputValue={inputValue}
          handleSearchChange={handleSearchChange}
          handleAddMovie={handleAddMovie}
        />
        <Suggestions
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
        <div className='error-block'> <ErrorComponent errorMessage={errorMessage} />
        <div/>
        <MovieDisplay movies={movies}  handleDeleteMovie={handleDeleteMovie}/>
        <button onClick={handleGetRecommendation} className="get-recommendation-button">
          Get Recommendation
        </button>
        <RecommendedMovies recommendations={recommendations}  moviesToShow={moviesToShow} handleShowMore={handleShowMore}/>
      </div>
    </>
  );
}

export default MovieList;