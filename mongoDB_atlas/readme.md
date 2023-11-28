Explanation step by step on how I have created the database on mongoDB Atlas.
 - Have an account on mongoDB Atlas
 - Create a free cluster
 - Create a user and password of the cluster
 - Select Connect to the cluster with 'Drivers' option
 - Connect to the cluster using the 'connect_cluster.py' script (it needs the user, password and url)
 - Upload 'u.item' file to the cluster using 'upload_file_to_cluster.py' (it needs the file to be on the same directory, user, password and url)


To check that the file is in the cluster i have followed these steps:
 - Select Connect to the cluster with 'Shell' option
 - Download mongosh
 - Add <your mongosh's download directory>/bin to your $PATH variable (a more detailed explanation of this is here: https://www.mongodb.com/docs/mongodb-shell/install/#procedure)
 - Run the connection string in cmd (connection string: mongosh "mongodb+srv://cluster0.zufneus.mongodb.net/" --apiVersion 1 --username agarciro335)
 - Use the database and the collection created, run these commands on cmd (the last command shows a sample of the database)
	- show dbs
	- use movielense_database
	- show collections
	- db.movies_100k.find()

The file I have used to upload to the cluster is the file "u.item" from movielense 100k dataset. I got it from the website: http://files.grouplens.org/datasets/movielens/ml-100k/

