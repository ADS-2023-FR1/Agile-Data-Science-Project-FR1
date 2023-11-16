# Summary of user_interaction.py

I created some functions needed to interpret inputs and outputs of the recomender through movielens data
these funtions depend on two files: links.csv and movies.csv for codifying and decodifying IDs and titles.
These need to be in the same directory or the path needs to be incroporate into the respective functions.

Finaly there is the recommend_new_sequence(movies, model_path, n_recom=5) funtion, that from a sequential model,
and a sequence of titles retrieves new recomendations for that sequence. If you work within this directory you
could just import user_interactions as ui and use them.

Further improvements could be done, specifically in the get_movie_id(title) function as the user may misspell
or put a variety of diferent imputs that is not yet taken into account. This could be a task for future sprints.			
