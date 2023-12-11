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

A function for adding new users to the training data is `create_mock_user(data, movie_ids, ratings, save=False)`.
It adds a new user to teh data based on the given ratings, and movie_ids. 

Also `update_existing_user(data, movie_ids, ratings, user)` allows for updating the training data. However,
for actually updating the factorizers models need to be retrained from scratch with the whole updated data.

## Summary of `settings_definition.py`

It contains the definition of some functions used for the training of the model.
- `define_model(config)`: gets the config and returns a model with all the specifications selected.
- `define_dataset(config)`: gets the config and returns the dataset with all the specifications selected.
- `evaluate_model(model, test, config)`: gets the config, the trained model, and the test data, and returns a dictionary with all the metrics.

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

## Summary of `validation.ipynb`

Putting the funtions in `settings_definition.py` to use comparing the metrics of the different models and sumarising their performance. After training all models (without hyperparameter tuning) on the 100K mobielens data, the best performance comes from the implicit factorizer model. Still the mean mrr is best for the sequential model but there are lost of variability in its predictions.

## Summary of `trained_model`

It is an already trained model. At the moment, it is an implicit sequence model trained during 10 iters.
The specifications of the model can be seen in config.json, following the default definition.

## Summary of `factorizer_model_mockuserid6041`

It is an already trained implicit factorizer model on the 1M movielens data. The already loded films and ratings are: 

		movie_ids = [23,44,32,55,66,77,8,10,14]
		ratings =   [2.,3.,4.,5.,2.,1.,5.,4.,4.]

The mock user id is: 6041.

## Summary of `update_script.py`

This might not be need but is a scrit exemplifiying what needs to be done in case
we wanted to update the films watched by the mock user.

## Summary of `requirements.txt`

It's a list of all the imports that need to be done to run the code. They all can be installed with `conda install -y --file requirements.txt` .
With this and `python setup.py build ; python setup.py install` in the spotlight directory, everything can be run.
This is what is performed in the github server to run the tests.

## Summary of `test_models.py`

Code with the tests that will be automatically perfomed at each push to main and dev with the github actions.
At the moment, the only tests we run are predicting with the saved sequence model and with the factorizer.
Even though they might seem simple, it ensures there is no major issue with our main functionalities and the back end and front should be able to use it properly.

## Summary of `trained_model_sequence` and `trained_model_factorizer`

To run the tests, it is important to keep the two models separated, so that the code does not get confused. This two models are examples.
