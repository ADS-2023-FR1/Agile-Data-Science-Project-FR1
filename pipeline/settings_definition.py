def define_model(config):
    """Function to define the model based on the parameters of the config"""
    
    if config["model"] == "sequence" and config["submodel"] == "implicit":
        from spotlight.sequence.implicit import ImplicitSequenceModel as ImportModel
    elif config["model"] == "factorizer" and config["submodel"] == "implicit":
        from spotlight.factorization.implicit import ImplicitFactorizationModel as ImportModel
    elif config["model"] == "factorizer" and config["submodel"] == "explicit":
        from spotlight.factorization.explicit import ExplicitFactorizationModel as ImportModel
    else:
        raise Exception(f"Incorrect model configuration for model {config['model']} and submodel {config['submodel']}.")
    return ImportModel(loss=config["loss"], representation=config["representation"],embedding_dim=config["embedding_dim"],
                       n_iter=config["n_iter"], batch_size=config["batch_size"], l2=config["l2"], learning_rate=config["lr"],
                       optimizer_func=config["optim"], use_cuda=config["use_cuda"], sparse=config["sparse"], 
                       random_state=config["random_state"])#, num_negative_samples=config["num_negative_samples"])

def define_dataset(config):
    """Function to define the dataset based on the parameters of the config"""
    from spotlight.datasets.movielens import get_movielens_dataset
    from spotlight.datasets.synthetic import generate_sequential
    from spotlight.datasets.goodbooks import get_goodbooks_dataset
    
    if config["dataset"] == "Movielens":
        return get_movielens_dataset(variant=config["size"])
    elif config["dataset"] == "Synthetic":
        return generate_sequential()
    elif config["dataset"] == "Goodbooks":
        return get_goodbooks_dataset()
    else:
        raise Exception(f"Incorrect dataset configuration for dataset {config['dataset']}.")
        
def evaluate_model(model, test, config):
    """This function evaluates the metric agreed by the team. The metrics that are abailble
       for all the models are precision, recall, and mmr."""
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

