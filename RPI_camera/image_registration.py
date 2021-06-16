import cv2 
import numpy as np 

  
def myRegistration(path_image1, path_image2):

	# Open the image files. 
	img1_color = cv2.imread(path_image1)  # Image to be aligned. 
	img2_color = cv2.imread(path_image2)


	# Convert to grayscale. 
	img1 = cv2.cvtColor(img1_color, cv2.COLOR_BGR2GRAY) 
	img2 = cv2.cvtColor(img2_color, cv2.COLOR_BGR2GRAY) 
	height, width = img2.shape 
	  
	# Create ORB detector with 5000 features. 
	orb_detector = cv2.ORB_create(5000) 
	  
	# Find keypoints and descriptors. 
	# The first arg is the image, second arg is the mask 
	#  (which is not reqiured in this case). 
	kp1, d1 = orb_detector.detectAndCompute(img1, None) 
	kp2, d2 = orb_detector.detectAndCompute(img2, None) 
	  
	# Match features between the two images. 
	# We create a Brute Force matcher with  
	# Hamming distance as measurement mode. 
	matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck = True) 
	  
	# Match the two sets of descriptors. 
	matches = matcher.match(d1, d2) 
	  
	# Sort matches on the basis of their Hamming distance. 
	matches.sort(key = lambda x: x.distance) 
	  
	# Take the top 90 % matches forward. 
	matches = matches[:int(len(matches)*90)] 
	no_of_matches = len(matches) 
	  
	# Define empty matrices of shape no_of_matches * 2. 
	p1 = np.zeros((no_of_matches, 2)) 
	p2 = np.zeros((no_of_matches, 2)) 
	  
	for i in range(len(matches)): 
	  p1[i, :] = kp1[matches[i].queryIdx].pt 
	  p2[i, :] = kp2[matches[i].trainIdx].pt 
	  
	# Find the homography matrix. 
	homography, mask = cv2.findHomography(p1, p2, cv2.RANSAC) 
	  
	# Use this matrix to transform the 
	# colored image wrt the reference image. 
	transformed_img = cv2.warpPerspective(img2_color, 
	                    homography, (width, height)) 
	  
	# Save the output. 
	outPath = image2Name[:-4] + '.jpg'
	cv2.imwrite(outPath, transformed_img) 



image1Name = 'img1.jpg'
image2Name = 'img2.jpg' 
myRegistration(image1Name, image2Name)


# img1_color = cv2.imread("image_ref.jpg")  # Image to be aligned. 
# img2_color = cv2.imread("image_2.jpg" )
# print(img1_color)
# print(img2_color)
