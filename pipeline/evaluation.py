# This script is what MLflow will need as an input

from spotlight.cross_validation import random_train_test_split

def evaluate_model(model, test):
    """This function evaluates the metric agreed by the team.
    At the moment we have not decided which ones so I just pick 2 as an example."""
    from spotlight.evaluation import mrr_score, precision_recall_score, rmse_score, sequence_mrr_score, sequence_precision_recall_score
    eval = {"mrr": mrr_score(model, test), "precision_recall": precision_recall_score(model, test), #"rmse": rmse_score(model, test),
            #"sequence_mrr":sequence_mrr_score(model, test), "sequence_precision_recall": sequence_precision_recall_score(model, test)
           }
    return eval



# Execution

dataset = define_dataset(config)
train, test = random_train_test_split(dataset)
if config["model"] == "sequence":
    train, test = train.to_sequence(), test
model = define_model(config)
model.fit(train)

eval = evaluate_model(model, test)
eval