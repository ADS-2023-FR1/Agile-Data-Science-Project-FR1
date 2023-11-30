import React from 'react';

const MovieDisplay = ({ movies }) => {
  return (
    <div className="movie-list">
      <h2>Movie List:</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <span>{movie.title}</span>
            <button  className="btn">Delete</button> 
            {/* onClick={() => deleteTodo(todo.id)} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDisplay;
