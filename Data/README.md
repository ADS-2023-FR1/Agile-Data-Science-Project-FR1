
# This is the ReadMe for the Data used in the project

Spotlight offers a slew of popular datasets, including Movielens 100K, 1M, 10M, and 20M. It also incorporates utilities for creating synthetic datasets.

Spotlight offers 3 different kind of datasets: 
1) 
2) 
3) 

Because as one of the tasks of the project, we want to focous on analyzing the data, we have decided to use data from The Movies Dataset (https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset) available on Kaggle to do so. Some of the models will be trained from this data and others will be trained directly from the data provided by Spotlight.

The Movies Dataset contains files with 26 million ratings from 270,000 users for 45,000 movies. For the purpose of this project, we used the ratings_small file from the dataset, which contains a subset of 100,000 ratings from 700 users on 9,000 movies. The full dataset takes a much longer time to train on but you can try using it if you have a machine with a powerful GPU. 

We will use 3 data files:

· **ratings_small.csv** — contains the rating data for different users and movies.
· **movies_metadata.csv** — contains the metadata for all the 45,000 movies in the dataset.
· **links.csv** — contains the IDs that can be used to lookup each movie when joining this data with the movie metadata.

