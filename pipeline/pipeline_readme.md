# Readme for the pipeline folder

## Summary of `user_interaction.py`

It contains some functions needed to interpret inputs and outputs of the recomender through movielens data.
These funtions depend on two files: **links.csv** and **movies.csv** for codifying and decodifying IDs and titles.
These need to be in the same directory or the path needs to be incroporated into the respective functions.

Finally, there is the `recommend_new_sequence(movies, model_path, n_recom=5)` funtion, that from a sequential model,
and a sequence of titles retrieves new recomendations for that sequence. If you work within this directory you
could just import user_interactions as ui and use them.

Further improvements could be done, specifically in the `get_movie_id(title)` function as the user may misspell
or put a variety of diferent imputs that is not yet taken into account. This could be a task for future sprints.	

## Summary of `settings_definition.py`

It contains the definition of some functions used for the training of the model.
- `define_model(config)`: gets the config and returns a model with all the specifications selected.
- `define_dataset(config)`: gets the config and returns the dataset with all the specifications selected.

## Summary of `config.json`

It is a json defining all the parameters used to train a model. Having this json may help us tracking the parameters
when training and differentiating models.

## Summary of `training.ipynb`

It contains an example of the training of a model. It extracts the parameters from the config or redefines it in a cell,
then, loads the model and dataset using the functions from settings_definition.py and trains the model.
Finally, it calculates some metrics and prints their results. At the moment it is only running mrr and precision_recall.

## Summary of `execution.ipynb`

It's an example of an execution pipeline. At the moment it is super simple, with just a couple of parameters.
The goal of this file is to have the "oficial" execution process of our model in one place.
When we add more steps, it should go here.

As the pipeline at the moment is pretty simple and we just use a pretrained model, we don't need a config file,
the parameters can be defined at the beginning of the notebook.

## Summary of `trained_model`

It is an already trained model. At the moment, it is an implicit sequence model trained during 10 iters.
The specifications of the model can be seen in config.json, following the default definition.