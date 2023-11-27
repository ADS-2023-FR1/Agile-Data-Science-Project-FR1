import React from 'react';

const MovieDisplay = ({ movies }) => {
  return (
    <div className="movie-list">
      <h2>Movie List:</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDisplay;
