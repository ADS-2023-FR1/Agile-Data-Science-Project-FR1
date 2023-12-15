import React, { useState } from 'react';
import '../../style/recommendedComp.css';

const RecommendedMovies = ({ recommendations, moviesToShow, handleShowMore }) => {
  return recommendations.length > 0 && (
    <div className="recommended-movies">
      <div className="movie-squares">
        {recommendations.slice(0, moviesToShow).map((movie, index) => (
          <div key={index} className="movie-square">
            <div className="empty-square">
              <img
                src={movie.imageUrl || require('./../../assets/images/poster-placeholder.png')}
                alt={movie.title}
              />
              <div className="title-box">
                <div className="movie-title">{movie.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {moviesToShow < recommendations.length && (
        <button onClick={handleShowMore} className='reco-show-more'>Show more results</button>
      )}
    </div>
  );
};

export default RecommendedMovies;
