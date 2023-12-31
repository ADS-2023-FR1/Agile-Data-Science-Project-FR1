import React from 'react';
import '../../style/login.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/HeaderComponent';

const Login = () => {

    useEffect(() => {
        // Set the title when the component mounts
        document.title = 'MovieRec';
        return () => {
          document.title = 'MovieRec';
        };
    
      }, []);

    return (
        <div className='login-main-container'>
            <div className='reco-box'>
                <Link to="/home">  
                    <span className='reco-text'>MovieRec</span>
                </Link>
            </div>
            <form className='login-wrapper'>
                <span className='login-text-2'>Login </span>
                <input className='login-section' type="text" id="username" name="username" placeholder="Username" required />
                <input className='login-section-2' type="password" id="password" name="password" placeholder="Password" required />
                <span className='login-text-5'>Forgot Password?</span>
                <div></div>
                <Link to="/userpage" className='login-text-6'>Continue</Link>
                <div className='login-box'>
                    <span className='login-text-7'>New User? </span>
                    <span className='login-text-8'>Register</span>
                </div>
            </form>
        </div>
    );
};

export default Login;

/*import React from 'react';
import '../../style/login.css';
import { Link } from 'react-router-dom';
import Header from '../components/HeaderComponent';

const Login = () => {
    return (
        <div className='login-main-container'>
            <span className='login-text'>MovieRe</span>
            <form className='login-wrapper'>
                <span className='login-text-2'>Login </span>
                <input className='login-section' type="text" id="username" name="username" placeholder="Username" required />
                <input className='login-section-2' type="password" id="password" name="password" placeholder="Password" required />
                <span className='login-text-5'>Forgot Password?</span>
                <div></div>
                <Link to="/userpage" className='login-text-6'>Continue</Link>
                <div className='login-box'>
                    <span className='login-text-7'>New User? </span>
                    <span className='login-text-8'>Register</span>
                </div>
            </form>
        </div>
    );
};

export default Login;
 */