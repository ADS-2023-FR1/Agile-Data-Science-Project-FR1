import movieData from './movieTitle.json'

export const addMovie = (movies, setMovies, inputValue, setInputValue, setErrorMessage, setSuggestions) => {
  if (movies.length < 5) {
    if (inputValue.trim() !== '') {
      const movieAlreadyInList = movies.some((movie) =>
        movie.title.toLowerCase() === inputValue.toLowerCase()
      );
      if(movieAlreadyInList === false){
        const movieExists = movieData.some((movie) =>
          movie.title.toLowerCase() === inputValue.toLowerCase()
        );
        if (movieExists) {
          const movie = movieData.find((movie) =>
              movie.title.toLowerCase() === inputValue.toLowerCase()
          );
          setMovies([...movies, movie]);
          setInputValue('');
          setErrorMessage('');
        } else {
          setErrorMessage('Movie not found in database');
        }
      } else {
        setErrorMessage('Movie already exists in the list');
      }
    } else {
      setErrorMessage('Please enter a movie name');
    }
  } else {
    setErrorMessage('You can only add up to 5 movies');
  }
  setSuggestions([]);
};
  

  export const getRecommendation = async (movies, setRecommendations, setErrorMessage) => {
    if (movies.length > 0) {
      try {
        const modifiedMovies = movies.map(movie => {
          const indexOfOpeningParenthesis = movie.title.indexOf('(');
          return movie.title.slice(0, indexOfOpeningParenthesis-1)
        });
        
        const result = modifiedMovies.join('&title=');
        
        const response = await fetch(`http://localhost:8000/getRecommendation?title=`+ result);
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

  export const getRecommendationFactorial = async (setRecommendations, setErrorMessage) => {
      try {
        const user_id = "6041";
        const response = await fetch(`http://localhost:5000/getRecommendationUser?user_id=${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations for user');
        }
        const data = await response.json();
        setRecommendations(data.recommendation);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to get recommendations');
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
  
  
  

  export const suggestionClick = (suggestion, setInputValue, setSuggestions, movies, setMovies, setErrorMessage) => {
    const inputValue = suggestion.title;
    if (movies.length < 5) {
      if (inputValue.trim() !== '') {
        const movieAlreadyInList = movies.some((movie) =>
          movie.title.toLowerCase() === inputValue.toLowerCase()
        );
        if(movieAlreadyInList === false){
          const movieExists = movieData.some((movie) =>
            movie.title.toLowerCase() === inputValue.toLowerCase()
          );
          if (movieExists) {
            const movie = movieData.find((movie) =>
                movie.title.toLowerCase() === inputValue.toLowerCase()
            );
            setMovies([...movies, movie]);
            setInputValue('');
            setErrorMessage('');
          } else {
            setErrorMessage('Movie not found in database');
          }
        } else {
          setErrorMessage('Movie already exists in the list');
        }
      } else {
        setErrorMessage('Please enter a movie name');
      }
    } else {
      setErrorMessage('You can only add up to 5 movies');
    }
    setSuggestions([]);
    
    // const movie = movieData.find((movie) =>
    //           movie.title.toLowerCase() === suggestion.title.toLowerCase()
    //       );
    //       setMovies([...movies, movie]);
    //       setInputValue('');
    //       //setErrorMessage('');
    // setSuggestions([]);
  };