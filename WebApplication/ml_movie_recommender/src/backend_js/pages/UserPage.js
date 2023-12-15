import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './../../style/userPage.css';
import RecommendedMovies from '../components/RecommendedComponent';
import { getRecommendationFactorial } from '../utils';

const UserPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState(5);

  const handleGetRecommendation = async () => {
    getRecommendationFactorial(setRecommendations, setErrorMessage);
  };

  return (
    <div className='doc'>
      <div className="header">
        <div>
          <img
            src={require("../../assets/images/logo.png")}
            alt="MovieRe Logo"
            className="logo"
            style={{ width: "250px", height: "auto" }}
          />
        </div>
        <div className="user-pic">
          <Link to="/logout">
            <img
              src={require("../../assets/images/user.png")}
              alt="User Icon"
              className="user-icon user-icon-circle"
              style={{ width: "48px", height: "48px" }}
            />
          </Link>
        </div>
      </div>

      <div className="main-class">
        <div className="sidebar">
          <div>
            <h2>Main Menu</h2>
          </div>
          <div className="sidebar-buttons">
            <button className="sidebar-button">Overview</button>
            <button className="sidebar-button">Your watched movies</button>
            <button className="sidebar-button">New recommendations</button>
            <Link to="/">
              <button className="sidebar-button-logout">Log Out</button>
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="centered-box">
            <button onClick={handleGetRecommendation} className="get-recommendation-button">
              Get Recommendation
            </button>
            <RecommendedMovies
              recommendations={recommendations}
              moviesToShow={moviesToShow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
