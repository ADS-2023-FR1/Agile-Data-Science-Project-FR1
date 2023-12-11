import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Welcome to our Movie Recommender!</h1>
      <p>Start exploring and discovering new movies.</p>
      <Link to="/recommendation">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default Landing;
