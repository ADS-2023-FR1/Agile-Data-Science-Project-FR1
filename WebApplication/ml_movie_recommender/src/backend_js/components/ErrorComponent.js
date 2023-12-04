import React from 'react';
//Handel the incomming error messages
const ErrorComponent = ({ errorMessage }) => {
  return errorMessage ? <p className="error-message">{errorMessage}</p> : null;
};

export default ErrorComponent;
