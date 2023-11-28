import React from 'react';

const MovieDisplay = ({ movies, handleRemoveMovie }) => {
  const handleRemoveClick = (index) => {
    handleRemoveMovie(index);
  };

  return (
    <div className="movie-list">
      <h2>Movie List:</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie}
            <button onClick={() => handleRemoveClick(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDisplay;
