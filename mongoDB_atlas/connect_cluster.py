from pymongo import MongoClient

# Replace <password> with your actual MongoDB Atlas password
password = "fYKj5ZGuC4H0LFNW"

# Replace cluster0 and agarciro335 with your MongoDB Atlas cluster name and username
cluster_name = "cluster0"
username = "agarciro335"

# Construct the MongoDB Atlas connection URI
uri = f"mongodb+srv://{username}:{password}@{cluster_name}.zufneus.mongodb.net/test?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB Atlas!")
except Exception as e:
    print(e)
