import os
import torch
import numpy as np
from user_interactions import *
from settings_definition import *

def test_seq_prediction():
    
    
    model_path = "../pipeline/trained_model_sequence"
    n_recom = 5
    movies = np.array(['Sabrina', 'Mortal Kombat'])
    
    os.chdir("../spotlight")
    torch.load(model_path)
    titles = recommend_new_sequence(movies, model_path, n_recom=n_recom)
    
    assert len(titles) == n_recom
