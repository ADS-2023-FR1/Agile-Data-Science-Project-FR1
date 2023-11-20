# Spotlight Analysis for Front and Backend design

```python
import pandas as pd

# Specify the file paths (adjust paths accordingly)
ratings_path = 'ml-100k/u.data'
users_path = 'ml-100k/u.user'
items_path = 'ml-100k/u.item'

# Define column names for the data files
ratings_columns = ['userId', 'movieId', 'rating', 'timestamp']
users_columns = ['userId', 'age', 'gender', 'occupation', 'zip_code']
items_columns = ['movieId', 'title', 'release_date', 'video_release_date', 'IMDb_URL', 'unknown', 'Action', 'Adventure', 'Animation', 'Children', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western']

# Load data into DataFrames
ratings_df = pd.read_csv(ratings_path, sep='\t', names=ratings_columns)
users_df = pd.read_csv(users_path, sep='|', names=users_columns)
items_df = pd.read_csv(items_path, sep='|', names=items_columns, encoding='latin-1')

# Display the first few rows of each DataFrame for verification
print("Ratings DataFrame:")
print(ratings_df.head())

print("\nUsers DataFrame:")
print(users_df.head())

print("\nItems DataFrame:")
print(items_df.head())
```
Values that we want to send to the model: 
- age
- gender
- occupation
- genera
- decade

**Building the Website:** We'll use two important tools - React and Flask. React helps create the part of the website you see and interact with, while Flask manages the behind-the-scenes work.

**React for the Interface:** Imagine React as the artist who creates different sections of the website. For our movie recommendation site, React will create the place where you can tell the website what kind of movies you like.

**Flask for the Brain:** Now, think of Flask as the brain of the operation. It takes the information you give (like your age, favorite genre, etc.) and figures out which movies match your preferences.

**Connecting React and Flask:** When you type in your details on the website, React sends that information to Flask through a special message (kind of like an email). Flask then processes this info, finds movies that match your taste, and sends back a list of recommendations.

![Movie Recommendation System](/../img/diagram.png)
