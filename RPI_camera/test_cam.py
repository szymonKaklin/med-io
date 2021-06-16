from picamera import *
import time
import os
from image_registration import myRegistration

# Photo 1: No filter -no flash
# Photo 2: No filter - UV light
# Photo 3: All IR  - IR flash
# Photo 4: 720 nm - IR flash
# Photo 5: 760 nm - IR flash
# Photo 6: 840 nm - IR flash
# Photo 7: 940 nm - IR flash
# Photo 8: Bi785 - IR flash
# Photo 9; Bi850 - IR flash

myCam = PiCamera()
myCam.resolution = (1080, 720)
myCam.zoom=(0.15,0.15,0.7,0.7)
directory = 'test_bluetooth'
if not os.path.exists(directory):
    os.makedirs(directory)

for i in range(9):
    path = "/home/pi/Documents/NewDataSet/"+directory+"/image"+ str(i+1)+".jpg"
    # myCam.capture('/home/pi/Documents/'+directory+'/image%s.jpg' %(i+1))
    if i == 0:
        path1=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 35 #35
        myCam.capture(path)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1)
    elif i == 1:
        path2=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 40 #40
        myCam.capture(path)
        myRegistration(path1, path2)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1) #5
    elif i == 2:
        path3=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 40 #40
        myCam.capture(path)
        myRegistration(path1, path3)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1)
    elif i == 3:
        path4=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 40 #40
        myCam.capture(path)
        myRegistration(path1, path4)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1)
    elif i == 4:
        path5=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 40 #40
        myCam.capture(path)
        myRegistration(path1, path5)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1)
    elif i == 5:
        path6=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 45 #45
        myCam.capture(path)
        myRegistration(path1, path6)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1)
    elif i == 6:
        path7=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 50 #50
        myCam.capture(path)
        myRegistration(path1, path7)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1) #8
    elif i == 7:
        path8=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 50 #50
        myCam.capture(path)
        myRegistration(path1, path8)
        print('Photo %i captured\n' %i)
        print('Next Photo:')   
        time.sleep(1)
    elif i == 8:
        path9=path # Keep path in memoryfor bluetooth transmission & registration
        myCam.brightness = 50 #50
        myCam.capture(path)
        myRegistration(path1, path9)
        print('Photo %i captured\n' %i)
    

# Send via bluetooth:
    
# path1 = "/home/pi/Documents/NewDataSet/"+directory+"/image1.jpg"
# path2 = "/home/pi/Documents/NewDataSet/"+directory+"/image2.jpg"
# path3 = "/home/pi/Documents/NewDataSet/"+directory+"/image3.jpg"
# path4 = "/home/pi/Documents/NewDataSet/"+directory+"/image4.jpg"
# path5 = "/home/pi/Documents/NewDataSet/"+directory+"/image5.jpg"
# path6 = "/home/pi/Documents/NewDataSet/"+directory+"/image6.jpg"
# path7 = "/home/pi/Documents/NewDataSet/"+directory+"/image7.jpg"
# path8 = "/home/pi/Documents/NewDataSet/"+directory+"/image8.jpg"
# path9 = "/home/pi/Documents/NewDataSet/"+directory+"/image9.jpg"

print('Sending images via bluetooth...')
cmdBluetooth = "obexftp -b 94:65:2D:D4:06:5C -B 20 -c PHONE_MEMORY/ -p"+path1+" "+path2+" "+path3+" "+path4+" "+path5+" "+path6+" "+path7+" "+path8+" "+path9
os.system(cmdBluetooth)
print('Sent!\n\n')

