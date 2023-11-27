import React from 'react';

const ErrorComponent = ({ errorMessage }) => {
  return errorMessage ? <p className="error-message">{errorMessage}</p> : null;
};

export default ErrorComponent;
