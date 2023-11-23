#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import torch
import numpy as np
import pandas as pd
import difflib

movies_path = '../tests/movies.csv'
links_path = '../tests/links.csv'

def get_movie_identifier(item_id):
    """
    Gets the movie imdbId for a movie id
    """
    links = pd.read_csv(links_path)
    return links['imdbId'][links['movieId']==item_id].values[0]

def get_movie_id(title):
    """
    Gets the movie id for a movie title match
    """
    movies = pd.read_csv(movies_path)
    

    existing_titles = list(movies['title'].values)
    closest_titles = difflib.get_close_matches(title, existing_titles)
    
    if len(closest_titles)==0: 
        print("Spelling Mistake in titles \n or not in library") #Further iterations may focurs on dealing with this error
        return 1
    movie_id =  movies['movieId'][movies['title']==closest_titles[0]].values[0]
    return movie_id


def get_movie_title(movie_id):
    """
    Gets the movie imdbId and tmdbId for a movie title
    """
    movies = pd.read_csv(movies_path)
    return movies['title'][movies['movieId']==movie_id].values[0]

def recommend_new_sequence(movies, model_path, n_recom=5):
    """
    Receives a trained model path, a sequence of movie titles,
    associates them to a movielens ID
    and then predicst n_recoms new movies
    for the user and returns their titles.
    """
    movies_ids = [get_movie_id(m) for m in movies]
    spotlight_model = torch.load(model_path) # Load model
    
    pred = spotlight_model.predict(movies_ids) # In the prediction we could specify a specific subpool in future filter implemtation
    indices = np.argpartition(pred, -n_recom)[-n_recom:] 
    best_movie_ids = indices[np.argsort(pred[indices])]
    titles = [get_movie_title(b+1) for b in best_movie_ids]
    return titles

