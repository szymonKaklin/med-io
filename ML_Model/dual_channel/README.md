# Dual-Channel CNN
order: <br /> 
1) Data Augmentation (if needed)
2) Resize algorithm (otherwise)
3) Dual-Channel CNN

If one of the two datasets needs data augmentation to match the number of element in the other dataset, use the data augmentation algorithm making sure the files directory matches the location of your folders. For the copping/shuffle method, pay attention to the dimensions of your images. The image is divided in 9 equal squares. This algorithm uses two different methods: rotation and pixel reorganisation of the image. 


If the datasets do not need data augmntation the "dual_channel_preprocessing" file is enough (only resizes). The "dual_channel_data_preproceesing" file is a code which resizes the pictures from RGB or NIR dataset as they need to present images with the same dimensions, in that case (400,400,3). The source direction can be changed accordingly if the resize is performed on RGB or NIR images. Moreover, we remove .DS and .HEIC files as the first one is not an image and the second one is not a .jpg file. Indeed, all fies need to be of the same type, in this case .jpg. 

Concerninig the Dual-Channel CNN algorithm, google colab was used to benefit from its GPU. Therefore, to ease the workflow, the final folder should be upploaded to a google drive account which will be accessed by the first cell of code in the CNN algorithm. Morover, using google colab allow the user to work with an environment that already has access to all the recquired libraries. The algorithm work with two sources for the data, source_RGB and source_NIR. Change the name according to the name of your folder. During the data augmentation process soem folders might be duplicated, which is denoted by a "(1)" in their name. The algorithm removes these files. 
