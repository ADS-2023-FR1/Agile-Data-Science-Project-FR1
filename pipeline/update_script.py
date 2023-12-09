from user_interactions import *
from settings_definition import *
import os
import pandas as pd
os.chdir("../spotlight")

#default config for the factorizer model
config = {
    # About the model
    "model": "factorizer",    # sequence or factorizer
    "submodel": "implicit",    # implicit or explicit
    "loss": "bpr",    # one of ‘pointwise’, ‘bpr’, ‘hinge’, ‘adaptive_hinge’ or 'regression', 'poisson','logistic'
    "representation": None,    # for sequence one of ‘pooling’, ‘cnn’, ‘lstm’, ‘mixture’, for factorizer always None !!!
    "embedding_dim": 32, 
    "n_iter": 10,
    "batch_size": 256,
    "l2": 0.0,
    "lr": 0.01,
    "optim": None,
    "use_cuda": False, 
    "sparse": False, 
    "random_state": None, 
    "num_negative_samples": 5,

    # About the database
    "dataset": "Movielens",    # Movielens, Synthetic or Goodbooks
    "size": "1M",
    # synthetic has a lot of different parameters but I'm not sure we are going to use it
}

data = define_dataset(config)
model = define_model(config)

#default mock user
movie_ids = [23,44,32,55,66,77,8,10,14]
ratings =   [2.,3.,4.,5.,2.,1.,5.,4.,4.]
mock_user = {'movies':movie_ids, 'ratings':ratings,}

#filepath to the update csv
path_update = "/.csv"
df = pd.read_csv(path_update)
movie_ids_update = df.values[:,0]
ratings_update = df.values[:,1]

data, mock_user_id = create_mock_user(data, movie_ids, ratings)
data = update_existing_user(data, movie_ids_update, ratings_update, mock_user_id)
model.fit(data)
#then we would need to save the model somewhere.

