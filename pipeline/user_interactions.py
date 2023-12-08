import torch
import numpy as np
import pandas as pd
import difflib

movies_path = '../tests/movies.csv'
links_path = '../tests/links.csv'
data_directory = '../Data/movie_links_library/'

def get_movie_identifier(item_id, links_path=links_path):
    """
    Gets the movie imdbId for a movie id
    """
    links = pd.read_csv(links_path)
    return links['imdbId'][links['movieId']==item_id].values[0]

def get_movie_id(title, config={'size': '1M'}):
    """
    Gets the movie id for a movie title match.
    It needs the dataset size from movielens
    and the directory where each different
    movies.csv is saved.
    """
    movies_path = data_directory+config["size"]+"/movies.csv"
    if config["size"]=='1M' or config["size"]=='10M':
        sep = '::'
        engine='python'
    elif config["size"]=='100K':
        sep = '|'
        engine='python'
    else: 
        sep = ','
        engine = None
    movies = pd.read_csv(movies_path, sep=sep, engine=engine,
                         dtype={'movieId':np.int32,'title':str,'genres':str})

    existing_titles = list(movies['title'].values)
    closest_titles = difflib.get_close_matches(title, existing_titles)
    
    if len(closest_titles)==0: 
        print("Spelling Mistake in titles \n or not in library") #Further iterations may focurs on dealing with this error
        return 1
    movie_id =  movies['movieId'][movies['title']==closest_titles[0]].values[0]
    return movie_id


def get_movie_title(movie_id, movies_path=movies_path):
    """
    Gets the movie imdbId and tmdbId for a movie title
    """
    movies = pd.read_csv(movies_path)
    return movies['title'][movies['movieId']==movie_id].values[0]

def recommend_new_sequence(movies, model_path, config, n_recom=5):
    """
    Receives a trained model path, a sequence of movie titles,
    associates them to a movielens ID
    and then predicst n_recoms new movies
    for the user and returns their titles.
    
    It needs the model configuration (config) dictionary
    in order to select the correct movies_path
    to the data.
    
    The model should be paired along its configuration
    when saved. If config is not available is enoguht to know
    which size data was used in model training and then input
    in this way:
    
    config = {'size': '100K'}
    """
    movies_ids = np.array([get_movie_id(m, config) for m in movies])
    spotlight_model = torch.load(model_path) # Load model
    
    pred = spotlight_model.predict(movies_ids) 
    indices = np.argpartition(pred, -n_recom)[-n_recom:] 
    best_movie_ids = indices[np.argsort(pred[indices])]
    titles = [get_movie_title(b+1) for b in best_movie_ids]
    return titles

