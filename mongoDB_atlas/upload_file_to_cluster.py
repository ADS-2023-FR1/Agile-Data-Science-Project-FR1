import pandas as pd
from pymongo import MongoClient

# Define the path to your u.item file
file_path = "u.item"  # Replace with the actual path to your u.item file

# Define the column names
columns = ["movie_id", "movie_title", "release_date", "video_release_date", "IMDb_URL",
           "unknown", "Action", "Adventure", "Animation", "Children's", "Comedy", "Crime",
           "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical", "Mystery",
           "Romance", "Sci-Fi", "Thriller", "War", "Western"]

# Read the u.item file into a DataFrame
df = pd.read_csv(file_path, sep='|', names=columns, encoding='latin-1')

# Connect to the MongoDB server
# Replace <password> with your actual MongoDB Atlas password
password = "fYKj5ZGuC4H0LFNW"

# Replace cluster0 and agarciro335 with your MongoDB Atlas cluster name and username
cluster_name = "cluster0"
username = "agarciro335"

# Construct the MongoDB Atlas connection URI
uri = f"mongodb+srv://{username}:{password}@{cluster_name}.zufneus.mongodb.net/test?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Create or get the database
db = client['movielense_database']

# Create or get the collection (similar to a table in relational databases)
collection = db['movies_100k']

# Convert the DataFrame to a dictionary and insert into the MongoDB collection
data_dict = df.to_dict(orient='records')
collection.insert_many(data_dict)

import pandas as pd
from pymongo import MongoClient

# Define the path to your u.item file
file_path = "u.item"  # Replace with the actual path to your u.item file

# Define the column names
columns = ["movie_id", "movie_title", "release_date", "video_release_date", "IMDb_URL",
           "unknown", "Action", "Adventure", "Animation", "Children's", "Comedy", "Crime",
           "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical", "Mystery",
           "Romance", "Sci-Fi", "Thriller", "War", "Western"]

# Read the u.item file into a DataFrame
df = pd.read_csv(file_path, sep='|', names=columns, encoding='latin-1')

# Connect to the MongoDB server
# Replace <password> with your actual MongoDB Atlas password
password = "fYKj5ZGuC4H0LFNW"

# Replace cluster0 and agarciro335 with your MongoDB Atlas cluster name and username
cluster_name = "cluster0"
username = "agarciro335"

# Construct the MongoDB Atlas connection URI
uri = f"mongodb+srv://{username}:{password}@{cluster_name}.zufneus.mongodb.net/test?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Create or get the database
db = client['movielense_database']

# Create or get the collection (similar to a table in relational databases)
collection = db['movies_100k']

# Convert the DataFrame to a dictionary and insert into the MongoDB collection
data_dict = df.to_dict(orient='records')
collection.insert_many(data_dict)

# Close the MongoDB connection
client.close()

# Close the MongoDB connection
client.close()
