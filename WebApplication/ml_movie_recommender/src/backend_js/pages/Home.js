import * as React from "react";
import '../../style/home.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home(props) {

  useEffect(() => {
    // Set the title when the component mounts
    return () => {
      document.title = 'MovieRec';
    };

  }, []);

  return (
    <>
      <div className='main-container'>
      <div className='section'>
        <Link to="/home">
          <span className='text'>MovieRec</span>
        </Link>
        <Link to="/login">
          <div className='group'>
            <span className='text-2'>Log in</span>
            <div className='img' />
          </div>
        </Link>
      </div>
      <div className='group-2'>
        <div className='pic' />
        <span className='text-3'>
          Use our state of the art recommender system based on spotlight to help
          you discover hidden gems, revisit timeless classics, and explore the
          latest blockbusters all tailored to you.
        </span>
      </div>
      <div className='section-2'>
        <Link to="/recommendation">
          <div className='group-3'>
            <span className='text-4'>Try it now</span>
            <div className='img-2' />
          </div>
        </Link>
      </div>
      <div className='img-3' />
      <div className='wrapper' />
      <div className='section-3' />
      <span className='text-5'>Tonights Recommendations</span>
      <span className='text-6'>
        Find your <br />
        new favourite Movies!
      </span>
      <div className='section-4'>
        <div className='img-4' />
        <div className='img-5' />
        <div className='img-6' />
        <div className='img-7' />
        <div className='pic-2' />
        <div className='pic-3' />
      </div>
      <div className='pic-4' />
      <div className='pic-5' />
      <div className='section-5' />
      <span className='text-7'>New Movies for you</span>
      <div className='pic-6' />
      <div className='img-8' />
    </div>
    </>
  );
}

export default Home;