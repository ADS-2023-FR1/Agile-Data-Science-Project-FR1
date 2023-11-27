import React from 'react';
import '../../style/recommendedComp.css';

const RecommendedMovies = ({ recommendations }) => {
  return recommendations.length > 0 && (
    <div className="recommended-movies">
      <h2>Recommended Movies:</h2>
      <div className="movie-squares">
        {recommendations.map((movie, index) => (
          <div key={index} className="movie-square">
            <div className="empty-square">
              <img src={movie.imageUrl} alt={movie} /> {/* feauture imbd img link*/}
              <div className="title-box">
                <div className="movie-title">{movie}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
