# Steps to install Spotlight 

### There are two ways of installing Spotlight:

- Through ancaonda:
```
conda install -c maciejkula pytorch spotlight
```
This sometimes may not work due to conflicting dependencies. It is advisable to crete a new environment and figure out the compatible versions. 

- On local:
  
Once having copied the github repository, open a terminal inside
```
~/Agile-Data-Science-Project-FR1/spotlight
```
then execute
```
python setup.py build; python setup.py install
```		


