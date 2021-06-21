# 3D CNN

Use the data augmentation algorithm making sure the files directory matches the location of your folders. This algorithm uses two different methods: rotation and pixel reorganisation of the image. It multiplies by six the size of the dataset. For the copping/shuffle method, pay attention to the dimensions of your images. The image is divided in 9 equal squares.

Concerninig the 3D-CNN algorithm, google colab was used to benefit from its GPU. Therefore, to ease the workflow, the final folder should be upploaded to a google drive account which will be accessed by the first cell of code in the CNN algorithm. Morover, using google colab allow the user to work with an environment that already has access to all the recquired libraries. Moreover, this code required at least 16GB of RAM for our dataset (8,640 images). 
The algorithm removes .DS files but also duplicated images, denoted by a "(1)". ex: image_2.jpg and image.2(1).jpg. 
Two functions were not used but left in the code. If someone desires to take advantages of these functions they allow to resize an image and to rotate according to some angle: "resize_volume(img)" and "scipy_rotate(volume)". To save RAM we performed all of these methos on a different notebook. 
Labels can be adjusted to any dataset, just correct the "labels" string array. 
The data is divided as follow: 70% train, 20% val and 10% test (tested at the end of the algorithm).
