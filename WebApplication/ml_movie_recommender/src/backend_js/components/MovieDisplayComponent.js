import React from 'react';

const MovieDisplay = ({ movies , handleDeleteMovie }) => {
  return (
    <div className="movie-list">
      <h2>Movie List:</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.movieId}>
            <span>{movie.title}</span>
            <button onClick={() => handleDeleteMovie(movie.movieId)} className="btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDisplay;
