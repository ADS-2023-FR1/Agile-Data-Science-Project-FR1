# This script is what MLflow will need as an input
import torch
import mlflow
import mlflow.sklearn
from mlflow.models import infer_signature
from settings_definition import define_model, define_dataset, evaluate_model
from spotlight.cross_validation import user_based_train_test_split

### Diferent model evaluations with MLflow ###

###  1.1 Sequential Model
# defining input parameters 

def train(lr=0.01, l2=0.0, n_iter=10):
    config = {
        # About the model
        "model": "sequence",    # sequence or factorizer
        "submodel": "implicit",    # implicit or explicit
        "loss": "bpr",    # one of ‘pointwise’, ‘bpr’, ‘hinge’, ‘adaptive_hinge’ or 'regression', 'poisson','logistic'
        "representation": "pooling",    # for sequence one of ‘pooling’, ‘cnn’, ‘lstm’, ‘mixture’, for factorizer always NONE !!!
        "embedding_dim": 32, 
        "n_iter": n_iter,
        "batch_size": 256,
        "l2": l2,
        "lr": lr,
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

    print(train)
    print(test)


    mlflow.set_experiment('Baseline Spotlight Model')

    # select model, trian and evaluate

    with mlflow.start_run():
        # Execute Model
        model1 = define_model(config)
        model1.fit(train)
        print(type(model1))

        # Evaluate metrics
        eval = evaluate_model(model1, test, config)
        print(eval)

        # Print out metrics
        print('MRR:', eval['mrr'])
        print('Precision:', eval['precision_recall'][0])
        print('Recall:', eval['precision_recall'][1])
        print('Mean Precision:', eval['mean_precision'])
        print('Precision standard deviation:', eval['precision_std'])
        print('Mean Recall:', eval['mean_recall'])
        print('Recall standard deviation:', eval['recall_std'])
        print('MRR mean:', eval['mrr_mean'])
        print('MRR standard deviaiton:', eval['mrr_std'])


        # dictionary of metrics to log
        metrics_to_log = {
        'mrr': eval['mrr'],
        'precision': eval['precision_recall'][0],
        'recall': eval['precision_recall'][1],
        # Add other metrics as needed
        }

        # Log parameter, metrics, and model to MLflow
        mlflow.log_param('n_iter', config["n_iter"])
        mlflow.log_param('lr', config['lr'])
        mlflow.log_param('l2', config['l2'])
        #mlflow.log_metric('mrr', eval['mrr'])
        #mlflow.log_metric('precision', eval['precision_recall'][0])
        #mlflow.log_metric('recall', eval['precision_recall'][1])
        #mlflow.log_metric('metrics', metrics_to_log)

        # Add other metrics as needed
        mlflow.log_metric('mean_precision', eval['mean_precision'])
        mlflow.log_metric('precision_std', eval['precision_std'])
        mlflow.log_metric('mean_recall', eval['mean_recall'])
        mlflow.log_metric('recall_std', eval['recall_std'])
        mlflow.log_metric('mrr_mean', eval['mrr_mean'])
        mlflow.log_metric('mrr_std', eval['mrr_std'])



        #predictions = model1.predict(train)
        #signature = infer_signature(train, predictions)
        mlflow.sklearn.log_model(
            sk_model = model1,
            #signature = signature,
            artifact_path='artifacts',
            registered_model_name = "Sequential-Model"
        )

        print(f"Model saved in run {mlflow.active_run().info.run_uuid}")

    #mlflow.set_tracking_uri("http://localhost:1234")


# changing lr to 0.01
train(lr= 0.01, l2= 0.0, n_iter=10)

# changing lr to 0.001
train(lr= 0.001, l2= 0.0, n_iter=10)

# changing l2
train(lr= 0.001, l2= 0.5, n_iter=10)

# changing l2
train(lr= 0.01, l2= 0.5, n_iter=10)

# changing n_iter
train(lr= 0.01, l2= 0.0, n_iter=50)

# changing n_iter
train(lr= 0.001, l2= 0.0, n_iter=50)