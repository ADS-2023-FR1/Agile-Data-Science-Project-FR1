import React from 'react';



const MovieDisplay = ({ movies , handleDeleteMovie }) => {
  return (
    <div className="movie-list">
      <h2>Movie List:</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={movie.id}>
            <span>{movie.title}</span>
            <button onClick={() => handleDeleteMovie(movie.id)} className="btn">Delete</button> 
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDisplay;
