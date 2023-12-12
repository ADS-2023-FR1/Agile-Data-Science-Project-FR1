import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/HeaderComponent';

const Login = () => {
    return (
        <div className='main-container'>
            <span className='text'>MovieRe</span>
            <div className='box'>
                <span className='text-2'>Login </span>
                <span className='text-3'>Username</span>
                <div className='section'>
                    <span className='text-4'>Password</span>
                </div>
                <span className='text-5'>Forgot Password?</span>
                <span className='text-6'>Continue</span>
                <div className='box-2'>
                    <span className='text-7'>New User? </span>
                    <span className='text-8'>Register</span>
                </div>
            </div>
            <div className='section-2' />
            <div className='box-3' />
        </div>
    );
};

export default Login;
