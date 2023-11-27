

export const addMovie = (movies, setMovies, inputValue, setInputValue, setErrorMessage) => {
    if (movies.length < 2) {
      if (inputValue.trim() !== '') {
        setMovies([...movies, inputValue]);
        setInputValue('');
        setErrorMessage('');
      } else {
        setErrorMessage('Please enter a movie name');
      }
    } else {
      setErrorMessage('You can only add up to 5 movies');
    }
  };
  
  export const getRecommendation = async (movies, setRecommendations, setErrorMessage) => {
    if (movies.length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/getRecommendation?title=${movies.join('&title=')}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        setRecommendations(data.recommendation);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to get recommendations');
      }
    } else {
      setErrorMessage('Please add movies before getting recommendations');
    }
  };
  
  export const handleChange = (event, setInputValue) => {
    setInputValue(event.target.value);
  };

  export const searchChange = (e, setInputValue, setSuggestions, movieData) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);
  
    if (searchValue.trim() === '') {
      setSuggestions([]);
      return;
    }
  
    const filteredSuggestions = movieData.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    const slicedSuggestions = filteredSuggestions.slice(0, 10);
  
    setSuggestions(slicedSuggestions);
  };
  
  export const suggestionClick = (suggestion, setInputValue, setSuggestions) => {
    const titleWithoutParentheses = suggestion.title.replace(/\s*\([^)]*\)\s*/g, '');
    setInputValue(titleWithoutParentheses);
    setSuggestions([]);
  };