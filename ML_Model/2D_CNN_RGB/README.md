
# 2D-CNN based on RGB images

Once the pictures were taken or downloaded, the need to be included in a single folde (source). In this folder, the pills are organised in a sub-folder according to the kind of pills they are. 
Then, in the code, functions are called to create other folders, for instance, the final folder where data are organised by validation folder, training folder and test folder. From the source, the code will separate the data according to the percentage defined for train, val and test. Then, the images will be moved from the source folder to the destination folder as shown in the code. 

Concerninig the CNN algorithm, google colab was used to benefit from its GPU. Therefore, to ease the workflow, the final folder should be upploaded to a google drive account which will be accessed by the first cell of code in the CNN algorithm. Morover, using google colab allow the user to work with an environment that already has access to all the recquired libraries. 
