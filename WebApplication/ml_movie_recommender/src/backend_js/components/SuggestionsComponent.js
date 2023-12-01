import React from 'react';
import '../../style/Suggestions.css';

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
