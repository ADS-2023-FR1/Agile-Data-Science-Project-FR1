from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend_new_sequence, recommend_new_factorial

# Look at readme in WebApplication for instruction on how to run

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
## When we send a array of movies from the js backend we tell the model backend to take those movies and fed them to the model
## and send back the model response/recommendations. 
@app.route('/getRecommendation', methods=['GET'])
def get_recommendation():
    if 'title' in request.args:
        titles = request.args.getlist('title')
        print(titles)
        
        model_path = "trained_model"  
        
        recommendation = recommend_new_sequence(titles, model_path)  # Pass both titles and model_path

        # Sending the recommendation back via JSON response
        print(recommendation)
        return jsonify({'recommendation': recommendation}), 200
    else:
        return jsonify({'error': 'Title not provided'}), 400

## Function to get movie recommendations for mock user 
@app.route('/getRecommendationUser', methods=['GET'])
def get_recommendation_factorial():
    if 'user_id' in request.args:
        # Retrieve user ID as a string and attempt to convert it to an integer
        user_id_str = request.args.get('user_id')
        try:
            user_id = int(user_id_str)
        except ValueError:
            return jsonify({'error': 'Invalid User ID provided. User ID must be an integer.'}), 400

        print(user_id)
        
        model_path = "factorizer_model_mock_user" 
        
        recommendation = recommend_new_factorial(user_id, model_path)  # Pass both user_id and model_path

        # Sending the recommendation back via JSON response
        print(recommendation)
        return jsonify({'recommendation': recommendation}), 200
    else:
        return jsonify({'error': 'User ID not provided'}), 400
if __name__ == '__main__':
    app.run(debug=True)
