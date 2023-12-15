import React from 'react';
//Handel the incomming error messages
const ErrorComponent = ({ errorMessage }) => {
  const paragraphStyle = {
    color: 'red',
    fontSize: '2vh',
    fontFamily: 'Helvetica Neue',
    width: '100%',
    textAlign: 'center',
  };
  
  return errorMessage ? <p style={paragraphStyle}>{errorMessage}</p> : null ;
};

export default ErrorComponent;
