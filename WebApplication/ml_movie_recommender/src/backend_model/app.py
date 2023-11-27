from flask import Flask, request, jsonify
import torch
import numpy as np
import pandas as pd
import difflib
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import get_movie_id, get_movie_title, recommend_new_sequence

# Look at readme in WebApplication for instruction on how to run

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/getRecommendation', methods=['GET'])
def get_recommendation():
    if 'title' in request.args:
        titles = request.args.getlist('title')
        print(titles)
        
        model_path = "testmodel"  # Replace this with your model path
        
        recommendation = recommend_new_sequence(titles, model_path)  # Pass both titles and model_path

        # Sending the recommendation back via JSON response
        print(recommendation)
        return jsonify({'recommendation': recommendation}), 200
    else:
        return jsonify({'error': 'Title not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
