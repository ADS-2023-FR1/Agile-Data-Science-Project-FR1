import React, { useState } from 'react';
import './../../style/recommendation.css';
import Header from '../components/HeaderComponent';
import InputComponent from '../components/InputComponent';
import ErrorComponent from '../components/ErrorComponent';
import RecommendedMovies from '../components/RecommendedComponent';
import Suggestions from '../components/SuggestionsComponent';
import MovieDisplay from '../components/MovieDisplayComponent';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
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

  useEffect(() => {
    // Set the title when the component mounts
    document.title = 'MovieRec';
    return () => {
      document.title = 'MovieRec';
    };

  }, []);

  const handleRemoveMovie = (index) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  };

  const handleShowMore = () => {
    setMoviesToShow(moviesToShow + 6);
  };

  const handleAddMovie = () => {
    addMovie(movies, setMovies, inputValue, setInputValue, setErrorMessage, setSuggestions);
  };

  const handleDeleteMovie = (id) => {
    setMovies( currentMovies => currentMovies.filter( movie => movie.movieId !== id));
  };

  const handleGetRecommendation = async () => {
    setMoviesToShow(6);
    getRecommendation(movies, setRecommendations, setErrorMessage);
  };

  const handleSearchChange = (e) => {
    searchChange(e, setInputValue, setSuggestions, movieData);
  };

  const handleSuggestionClick = (suggestion) => {
    suggestionClick(suggestion, setInputValue, setSuggestions, movies, setMovies, setErrorMessage);
  };



  // The imported from here
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') { //If the user press key "enter" we add title
      handleAddMovie();
    };
  };


  // end of imported

  return (
    
      <div className='reco-main-container'>
        <div className='reco-box'>
        <Link to="/home">  
          <span className='reco-text'>MovieRec</span>
        </Link>
      </div>
      <div className='reco-group'>
        <div className='reco-left-box'>
          <span className='reco-text-4'>Your Choices</span>
          <div className='reco-section'>
            <input className='reco-input-field'
                    type="text"
                    placeholder="Enter movies that you have seen and enjoyed"
                    value={inputValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}></input>
            <div className='reco-pic' />
          </div>
          <Suggestions
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
          />
          <ErrorComponent errorMessage={errorMessage} />
          <div>
            <ul className='reco-choices-list'>
                {movies.map((movie) => (
                  <li key={movie.movieId}>
                    <button onClick={() => handleDeleteMovie(movie.movieId)} className="reco-delete-button">X</button>
                    <span>{movie.title}</span>
                  </li>
                ))}
            </ul>
          </div>
          <button onClick={handleGetRecommendation} className="reco-get-recommendation-button">Get Recommendations</button>
        </div>
        <div className='reco-right-box'>
          <span className='reco-text-2'>What we recommend for you</span>
          <RecommendedMovies recommendations={recommendations}  moviesToShow={moviesToShow} handleShowMore={handleShowMore}/>
        </div>
      </div>
    </div>
  );
}

export default MovieList;