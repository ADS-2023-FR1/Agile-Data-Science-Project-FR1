import React, { useState } from 'react';
import '../../style/recommendedComp.css';

const RecommendedMovies = ({ recommendations, moviesToShow, handleShowMore }) => {
  return recommendations.length > 0 && (
    <div className="recommended-movies">
      <h2>Recommended Movies:</h2>
      <div className="movie-squares">
        {recommendations.slice(0, moviesToShow).map((movie, index) => (
          <div key={index} className="movie-square">
            <div className="empty-square">
              <img src={movie.imageUrl} alt={movie} /> {/* feature IMDb img link */}
              <div className="title-box">
                <div className="movie-title">{movie}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {moviesToShow < recommendations.length && (
        <button onClick={handleShowMore}>Show 5 more</button>
      )}
    </div>
  );
};

export default RecommendedMovies;
