import React from 'react';
import '../../style/InputComponent.css';

//Handels the user input.
const InputComponent = ({ inputValue, handleSearchChange, handleAddMovie }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') { //If the user press key "enter" we add title
      handleAddMovie();
    }
  };

  return (

    
    <div className="input-container">
      <div className='search-pic' />
      <image src={require('./../../assets/images/search.png')} alt="search" />
   
      <input
        className="input-field"
        type="text"
        placeholder="Enter five movies that you have seen and you enjoy"
        value={inputValue}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      /> 
      {/* <button className="add-button" onClick={handleAddMovie}>
        Add Movie
      </button> */}
      <p className="add-instruction"></p>    
    </div>
  );
};

export default InputComponent;

/* 

<div className='section'>
  <div className='group-3' />
  <div className='pic' />
</div>


*/