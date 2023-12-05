// Assume you have imported necessary dependencies and setup
import { addMovie, getRecommendation } from "./backend_js/utils";

//## add movies functions tests ##//
const movieData = [
  { title: 'Movie 1' },
  { title: 'Movie 2' },
  { title: 'Movie 3' },
  { title: 'Movie 4' },
  { title: 'Movie 5' },
];

// Mock functions and initial state
let movies = [];
let setMovies = jest.fn();
let inputValue = '';
let setInputValue = jest.fn();
let setErrorMessage = jest.fn();

describe('addMovie function', () => {
  beforeEach(() => {
    movies = [];
    setMovies = jest.fn();
    inputValue = '';
    setInputValue = jest.fn();
    setErrorMessage = jest.fn();
  });

  test('does not add two movies with the same name when movies list is empty', () => {
    movies = [{ title: 'Toy Story (1995)' },];
    addMovie(movies, setMovies, 'Toy Story (1995)', setInputValue, setErrorMessage);

    expect(setMovies).not.toHaveBeenCalled();
    expect(setInputValue).not.toHaveBeenCalled();
    expect(setErrorMessage).toHaveBeenCalledWith('Movie already exists in the list');
});
  
test('does not add an empty movie when movies list has less than 5 movies', () => {
  movies = [
      { title: 'Movie 1' },
      { title: 'Movie 2' },
      { title: 'Movie 3' },
  ];

  addMovie(movies, setMovies, '', setInputValue, setErrorMessage); // Attempting to add an empty movie

  expect(setMovies).not.toHaveBeenCalled(); // Ensure setMovies is not called
  expect(setInputValue).not.toHaveBeenCalled(); // Ensure setInputValue is not called
  expect(setErrorMessage).toHaveBeenCalledWith('Please enter a movie name'); // Verify error message for adding an empty movie
});

  test('does not add a movie when movies list has 5 movies already', () => {
    movies = [
      { title: 'Movie 1' },
      { title: 'Movie 2' },
      { title: 'Movie 3' },
      { title: 'Movie 4' },
      { title: 'Movie 5' },
    ];

    addMovie(movies, setMovies, 'Movie 6', setInputValue, setErrorMessage);

    expect(setMovies).not.toHaveBeenCalled();
    expect(setInputValue).not.toHaveBeenCalled();
    expect(setErrorMessage).toHaveBeenCalledWith('You can only add up to 5 movies');
  });

  // Add more test cases to cover other scenarios (movie already in list, movie not found, empty movie name, etc.)
});

/*# 
fetch recommendations functions tests 
#*/

describe('getRecommendation function', () => {
  let setRecommendations;
  let setErrorMessage;

  beforeEach(() => {
    setRecommendations = jest.fn();
    setErrorMessage = jest.fn();
  });

  function generateRecommendations(count) {
    const recommendations = [];
    for (let i = 1; i <= count; i++) {
      recommendations.push(`Recommendation ${i}`);
    }
    return recommendations;
  }
  
  // Generate recommendations with count as 20
  const recommendationsArray = generateRecommendations(20);
  

  test('handles empty movies list', async () => {
    await getRecommendation([], setRecommendations, setErrorMessage);

    expect(setRecommendations).not.toHaveBeenCalled();
    expect(setErrorMessage).toHaveBeenCalledWith('Please add movies before getting recommendations');
  });

  test('handles fetching recommendations for exactly 5 movies', async () => {
    const mockMovies = [
      { title: 'Inception' },
      { title: 'The Dark Knight (2008)' },
      { title: 'Interstellar (2014)' },
      { title: 'Pulp Fiction' },
      { title: 'The Shawshank Redemption' },
    ];

    // Mock fetch function to simulate a successful API response from the backend
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            recommendation: generateRecommendations(20),
          }),
      })
    );

    await getRecommendation(mockMovies, setRecommendations, setErrorMessage);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/getRecommendation?title=Inception&title=The Dark Knight&title=Interstellar&title=Pulp Fiction&title=The Shawshank Redemption'
    );
    expect(setRecommendations).toHaveBeenCalledWith(recommendation);
    expect(setErrorMessage).not.toHaveBeenCalled();
  });

});