# This script is what MLflow will need as an input
import mlflow
import mlflow.sklearn
from settings_definition import define_model, define_dataset
from spotlight.cross_validation import user_based_train_test_split


# Evaluation function

def evaluate_model(model, test, config):
    """This function evaluates the metric agreed by the team.
    At the moment we have not decided which ones so I just pick 2 as an example."""
    from spotlight.evaluation import mrr_score, precision_recall_score, rmse_score, sequence_mrr_score, sequence_precision_recall_score
    
    if config['model']=='factorizer':
        eval = {"mrr": mrr_score(model, test), "precision_recall": precision_recall_score(model, test), "rmse": rmse_score(model, test),
                #"sequence_mrr":sequence_mrr_score(model, test), "sequence_precision_recall": sequence_precision_recall_score(model, test)
               }
    else:
        eval = {"mrr": sequence_mrr_score(model, test), "precision_recall": sequence_precision_recall_score(model, test, k=5)
               }
    
    eval.update({"mean_precision": eval['precision_recall'][0].mean(), "precision_std": eval['precision_recall'][0].std(), 
                 "mean_recall":eval['precision_recall'][1].mean(), "recall_std": eval['precision_recall'][1].std(), 
                 "mrr_mean": eval['mrr'].mean(), "mrr_std": eval['mrr'].std()})
    return eval

### Diferent model evaluations with MLflow ###

###  1.1 Sequential Model
# defining input parameters 

config = {
    # About the model
    "model": "sequence",    # sequence or factorizer
    "submodel": "implicit",    # implicit or explicit
    "loss": "bpr",    # one of ‘pointwise’, ‘bpr’, ‘hinge’, ‘adaptive_hinge’ or 'regression', 'poisson','logistic'
    "representation": "pooling",    # for sequence one of ‘pooling’, ‘cnn’, ‘lstm’, ‘mixture’, for factorizer always NONE !!!
    "embedding_dim": 32, 
    "n_iter": 10,
    "batch_size": 256,
    "l2": 0.0,
    "lr": 0.01,
    "optim": None,
    "use_cuda": False, 
    "sparse": False, 
    "random_state": None, 
    "num_negative_samples": 5,

    # About the database
    "dataset": "Movielens",    # Movielens, Synthetic or Goodbooks
    "size": "100K",
    # synthetic has a lot of different parameters but I'm not sure we are going to use it
}

# load data
data = define_dataset(config)
train, test = user_based_train_test_split(data)
train = train.to_sequence()
test = test.to_sequence()

# select model, tran and evaluate

with mlflow.start_run():

    model1 = define_model(config)
    model1.fit(train)

    eval = evaluate_model(model1, test, config)
    eval