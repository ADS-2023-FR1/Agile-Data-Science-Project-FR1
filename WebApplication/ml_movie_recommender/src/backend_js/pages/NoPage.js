import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/HeaderComponent';

const NoPage = () => {
    return (
        <div>
            <Header />
            <h1>404 Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back home</Link>
        </div>
    );
};

export default NoPage;