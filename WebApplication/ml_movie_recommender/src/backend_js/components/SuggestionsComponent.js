import React from 'react';
import '../../style/Suggestions.css';

//the input suggestion box that appears below the input field. 

const Suggestions = ({ suggestions, handleSuggestionClick }) => {
  return (
    <div className="suggestions-container">
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
