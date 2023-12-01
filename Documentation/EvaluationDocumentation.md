# Movie Recommender System Evaluation Documentation

## Introduction

Welcome to the documentation for evaluating a movie recommender system using the IMDb movie database. This guide will walk you through the process of assessing the effectiveness of a recommender system that suggests movies based on previous user preferences.

## 1. Data Collection and Preprocessing

### 1.1 IMDb Movie Database

Ensure you have access to the IMDb movie database, a comprehensive collection of movie information. You can use the IMDb datasets available for public use. These datasets contain information about movies, including user ratings, genres, and cast details.

### 1.2 Data Preprocessing

Clean and preprocess the IMDb data to remove duplicates, handle missing values, and format the data for ease of use. Ensure that the dataset includes relevant information such as movie ratings, genres, and user preferences.

## 2. Building the Recommender System

### 2.1 Collaborative Filtering

Implement collaborative filtering algorithms, such as user-based or item-based collaborative filtering. These algorithms analyze user behavior and preferences to make personalized recommendations.

### 2.2 Content-Based Filtering

Incorporate content-based filtering, utilizing movie features like genres, directors, and actors to recommend similar movies based on a user's past choices.

### 2.3 Hybrid Approaches

Consider hybrid approaches that combine collaborative and content-based filtering for more accurate and diverse recommendations.

## 3. Evaluation Metrics

Select appropriate evaluation metrics to assess the performance of your recommender system. Common metrics include:

### 3.1 Mean Absolute Error (MAE)

MAE measures the average absolute differences between predicted and actual ratings, providing a sense of overall prediction accuracy.

### 3.2 Root Mean Squared Error (RMSE)

RMSE penalizes larger prediction errors more heavily, offering a more sensitive measure of accuracy.

### 3.3 Precision and Recall

In the context of a recommender system, precision and recall assess the relevance and completeness of recommendations.

## 4. Cross-Validation

Implement cross-validation techniques to ensure the reliability of your evaluation results. Split your dataset into training and testing sets multiple times, training the model on different subsets and testing on the remaining data.

## 5. A/B Testing

Consider conducting A/B testing by comparing the performance of your recommender system with different algorithms or parameters. This helps fine-tune your system for optimal results.

## 6. User Feedback

Incorporate user feedback as a qualitative measure of your recommender system's success. Solicit opinions and preferences from users to understand the real-world impact of your recommendations.

## Conclusion

By following these steps, you can systematically evaluate the effectiveness of your movie recommender system using the IMDb movie database. Regularly update and refine your system based on evaluation results and user feedback to ensure continuous improvement in recommendation accuracy and user satisfaction.

## Evaluation in our case - movielense 100k database

In our case, we have performed different evaluation experiments with the scores provided by Spotlight. 

These are the results:

Sequential:

 'mean_precision': 0.056295620437956204,
 'precision_std': 0.11018630630712584,
 'mean_recall': 0.056295620437956204,
 'recall_std': 0.11018630630712584,
 'mrr_mean': 0.05081374909310326,
 'mrr_std': 0.14060858935239787}


Implicit:

 'mean_precision': 0.47889908256880737,
 'precision_std': 0.22466014883869043,
 'mean_recall': 0.0734139089210515,
 'recall_std': 0.05930864354597846,
 'mrr_mean': 0.03468292471541635,
 'mrr_std': 0.024673809548225196}

Explicit:


'mean_precision': 0.26222222222222225,
 'precision_std': 0.2445302879571262,
 'mean_recall': 0.032389984964951116,
 'recall_std': 0.027798234725610108,
 'mrr_mean': 0.017774100084189223,
 'mrr_std': 0.012817271594728653}


And this is the overall conclusion:

After training all models (without hyperparameter tuning) on the 100K mobielens data, the best performance comes from the implicit factorizer model. Still the mean mrr is best for the sequential model but there are lots of variability in its predictions.



