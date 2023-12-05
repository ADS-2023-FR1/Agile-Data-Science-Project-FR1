import unittest
from model import get_movie_id, get_movie_title
import random  # Import the random module
from unittest.mock import patch
from app import app

class TestGetMovieId(unittest.TestCase):

    """
    Tests for getting movie id
    """
    def test_existing_movie_title(self):
        movie_id = get_movie_id('Toy Story (1995)')
        self.assertEqual(movie_id, 1, "Expected movie ID for 'Toy Story (1995)' not found")
    
    """
    Tests what happens if there is a spelling misstake
    """
    def test_spelling_mistake(self):
        movie_id = get_movie_id('Tay Stary (1995)') # Intentional spelling mistake
        self.assertEqual(movie_id, 1)  # Replace 1 with the expected return value for spelling mistake

    """
    Tests what happens if we send a empty string
    """
    def test_empty_movie_title(self):
        movie_id = get_movie_id("")
        self.assertEqual(movie_id, 1, "Expected return value for null title not found")

class TestGetMovieTitle(unittest.TestCase):
    """
    Tests get random movie id
    """
    def test_existing_movie_id(self):
        random_movie_id = random.randint(1, 3952)  # Generate a random movie ID between 1 and 3952
        movie_title = get_movie_title(random_movie_id)
        
        # Print the randomly generated movie ID and its title for testing
        print(f"Randomly generated movie ID: {random_movie_id}")
        print(f"Movie title for ID {random_movie_id}: {movie_title}")
        
        self.assertIsNotNone(movie_title, f"No title found for movie ID {random_movie_id}")

    """
    Tests get id out of range of moviesForModel.csv
    """
    def test_non_existing_movie_id(self):
        non_existing_movie_id = 4000
        try:
            movie_title = get_movie_title(non_existing_movie_id)
            self.assertIsNone(movie_title, "Expected None for non-existing movie ID")
        except IndexError:
            # Log the error if an index error occurs
            print(f"Error occurred: Movie with ID {non_existing_movie_id} is out of bounds")


class TestGetRecommendationEndpoint(unittest.TestCase):
    """
    Tests the response of getting recommendation without movies
    """
    def test_get_recommendation_without_titles(self):
        with app.test_client() as client:
            # Simulate a GET request to the endpoint without titles as query parameters
            response = client.get('/getRecommendation')

            # Assertions
            self.assertEqual(response.status_code, 400)
            data = response.get_json()
            self.assertEqual(data['error'], 'Title not provided')



        
if __name__ == '__main__':
    unittest.main()

