from flask import Flask, request, jsonify
import torch
import numpy as np
import pandas as pd
import difflib
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_movie_id(title):
    """
    Gets the movie id for a movie title match
    """
    movies = pd.read_csv('movies.csv')
    

    existing_titles = list(movies['title'].values)
    closest_titles = difflib.get_close_matches(title, existing_titles)
    
    if len(closest_titles)==0: 
        print("Spelling Mistake in titles \n or not in library")
        return 1
    movie_id =  movies['movieId'][movies['title']==closest_titles[0]].values[0]
    return movie_id


def get_movie_title(movie_id):
    """
    Gets the movie imdbId and tmdbId for a movie title
    """
    movies = pd.read_csv('movies.csv')
    return movies['title'][movies['movieId']==movie_id].values[0]

def recommend_new_sequence(movies, model_path, n_recom=5):
    """
    Receives a trained model path, a sequence of movie titles,
    associates them to a movielens ID
    and then predicts n_recoms new movies
    for the user and returns their titles.
    """
    movies_ids = [get_movie_id(m) for m in movies]
    spotlight_model = torch.load(model_path)  # Load the trained model
    
    pred = spotlight_model.predict(movies_ids)
    indices = np.argpartition(pred, -n_recom)[-n_recom:]
    best_movie_ids = indices[np.argsort(pred[indices])]
    titles = [get_movie_title(b+1) for b in best_movie_ids]  # Assuming movie IDs start from 1
    return titles

@app.route('/getRecommendation', methods=['GET'])
def get_recommendation():
    if 'title' in request.args:
        titles = request.args.getlist('title')
        print(titles)
        
        model_path = "testmodel"  # Replace this with your model path
        
        recommendation = recommend_new_sequence(titles, model_path)  # Pass both titles and model_path

        # Sending the recommendation back via JSON response
        print(recommendation)
        return jsonify({'recommendation': recommendation}), 200
    else:
        return jsonify({'error': 'Title not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
