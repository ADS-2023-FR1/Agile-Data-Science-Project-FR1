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
  
/*
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
*/
  
  
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

  export const getRecommendation = async (movies, setRecommendations, setErrorMessage) => {
    if (movies.length > 0) {
      try {
        const modifiedMovies = movies.map(movie => {
          const indexOfOpeningParenthesis = movie.title.indexOf('(');
          return movie.title.slice(0, indexOfOpeningParenthesis - 1);
        });
  
        const result = modifiedMovies.join('&title=');
  
        const response = await fetch(`http://localhost:8000/getRecommendation?title=` + result);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
  
        const data = await response.json();
        const recommendationData = data.recommendation;
  
        const newArray = recommendationData.map(item => item.replace(/\([^()]*\)/g, '').trim());
        const posterUrls = await displayMoviePosterByTitle(newArray);
  
        // Combine recommendationData and posterUrls into an object
        const combinedData = recommendationData.map((title, index) => ({
          title,
          imageUrl: posterUrls[index],
        }));
  
        setRecommendations(combinedData);
        return { recommendationData, posterUrls };
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to get recommendations');
        return { error: 'Failed to get recommendations' };
      }
    } else {
      setErrorMessage('Please add movies before getting recommendations');
      return { error: 'Movies not found' };
    }
  };
  
  export const getRecommendationFactorial = async (
    setRecommendations,
    setPoster,
    setMoviesToShow,
    setErrorMessage
  ) => {
    try {
      const user_id = "6041";
      const response = await fetch(
        `http://localhost:8000/getRecommendationUser?user_id=${user_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations for user");
      }
      const data = await response.json();
      const recommendationData = data.recommendation;
  
      const newArray = recommendationData.map((item) =>
        item.replace(/\([^()]*\)/g, "").trim()
      );
      const posterUrls = await displayMoviePosterByTitle(newArray);
  
      // Combine recommendationData and posterUrls into an object
      const combinedData = recommendationData.map((title, index) => ({
        title,
        imageUrl: posterUrls[index],
      }));
  
      setPoster(posterUrls);
      setRecommendations(combinedData);
  
      // Return the combined data
      return { combinedData };
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to get recommendations");
    }
  };
  
  
    async function displayMoviePosterByTitle(titles) {
      const baseUrl = 'https://api.themoviedb.org/3/search/movie';
      const apiKey = 'bf8921ed49166c5f21d76e1f79104845';
      const posterUrls = [];
    
      try {
        for (const title of titles) {
          const endpoint = `?api_key=${apiKey}&query=${encodeURIComponent(title)}&language=en-US`;
          const response = await fetch(baseUrl + endpoint);
    
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
    
          const data = await response.json();
          if (data.results.length > 0) {
            const posterPath = data.results[0].poster_path;
            if (posterPath) {
              const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
              console.log(`Movie Poster URL for "${title}":`, posterUrl);
              posterUrls.push(posterUrl);
            } else {
              throw new Error('No poster available for this movie.');
            }
          } else {
            throw new Error(`No movie found with the title "${title}".`);
          }
        }
        return posterUrls;
      } catch (error) {
        console.error('There was a problem fetching the poster:', error);
        return posterUrls;
      }
    }