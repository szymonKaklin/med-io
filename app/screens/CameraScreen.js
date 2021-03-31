import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import AppText from '../components/AppText';
import AppNavBar from '../components/AppNavBar';
import AppCamButton from '../components/AppCamButton';
import Screen from '../components/Screen';

import defaultStyles from '../config/styles';

// Function for capturing image and sending to server
function capturePill(navigation, cameraRef, setLoading) {
    console.log('Pressed Cam Button');
    
    cameraRef.current.takePictureAsync().then(picture => {
        setLoading(true); // Set loading spinner in motion
        cameraRef.current.pausePreview(); // Pause the live view of the image in the application so we can capture an image

        let localUri = picture.uri;

        // Promise for posting picture data to server - add method for web
        new Promise((resolve, reject) => {
            // Get the filename from the path
            let filename = localUri.split('/').pop(); 

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append('file', { uri: localUri, name: filename, type });

            // Post the form data to the prediction server
            // Gcloud run:
            // https://server-3lx5htvqrq-ew.a.run.app/predict
            // Local: 
            // "http://192.168.1.171:9999/predict"
            fetch("https://server-3lx5htvqrq-ew.a.run.app/predict", {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }).then(response => {
                resolve(response)
            }).catch(error => {
                console.log('Failed to post image to server: ', error)
                setLoading(false);
                Alert.alert(
                    'Failed to Post Image', 
                    `We couldn't access the server, check your phone's internet connection and try again`,
                    [
                        {
                            text: 'Dismiss',
                            onPress: () => cameraRef.current.resumePreview()
                        },
                    ],
                )
            });

        }).then(response => {
            response.json().then(result => {        
                // This is where we would handle the response by navigating to appropriate result
                setLoading(false); // stop the loading spinner
                cameraRef.current.resumePreview() // resume live camera preview

                // The model returns the confidence as logsoftmax (this is a strange function with a negative value).
                // If the confidence is more positive than -1 we assume the prediction is correct. Otherwise there is no prediction.
                // This assumption needs tuning
                let medicineID = result.confidence > -1 ? result.label : null;

                // Navigate to the results page sending the id of the medicien and the image as parameters
                navigation.navigate('Result', { medicineID, image: localUri });
            })
        }).catch(error => {
            console.log('The image was posted, but server response failed:', error)
        })
    }).catch(error => {
        console.log('Take PictureAsync error:', error)
    })
}

// Main export function
function CameraScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    
    // This state is used to track whether the loading spinner should be visible
    const [loading, setLoading] = useState(false); 

    // This allows us to keep a track of the camera element so we can call methods of it
    const cameraRef = useRef(null); 
    
    // This one is for setting the flash mode
    const [flash, setFlash] = useState(false)

    useEffect(() => {
        (async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA); // Camera.requestPermissionsAsync() was used previously but doesnt work on web
        setHasPermission(status === 'granted');
        })();
    }, []);

    // Renders if permission status is null
    if (hasPermission === null) {
        return <View />;
    }
    // Renders only if the user has camera permissions disabled in settings
    if (hasPermission === false) {
        return (
        <Screen style={styles.container}>
            <View style={styles.noaccess}>
            <AppText>App has no access to camera.</AppText>
            <AppText>Please enable access in device Settings.</AppText>
            </View>
            <View style={styles.navbar}>
            <AppNavBar
                title={'Menu'}
                title2={'Help'}
                icon={"menu"}
                icon2={"help-circle-outline"}
                onPress={() => navigation.navigate('Menu')}
                onPress2={() => Alert.alert(
                'Camera Screen',
                `Currently, the app has no access to your device camera.
                \nPlease enable this permission in your device settings.`,
                )}
                />
            </View>
        </Screen>
        );
    }

    // Main UI
    return (
        <Screen style={styles.container}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} flashMode={flash} ref={cameraRef}/>
            <View style={styles.loading}>
            <ActivityIndicator size="large" color={defaultStyles.colors.primary} animating={loading}/>
            </View>
            <View style={styles.navbar}>
            <AppNavBar
                title={'Menu'}
                title2={'Help'}
                icon={"menu"}
                icon2={"help-circle-outline"}
                onPress={() => navigation.navigate('Menu')}
                onPress2={() => Alert.alert(
                'Camera Screen',
                `Aim your phone camera at the medicine, and tap the 'Take Picture' button to attempt to identify it.
                \n The bottom left button can be used to toggle the flash on/off.
                \n Navigate to the main menu by pressing the top left 'Menu' button.`,
                )}
                />
            </View>
            <View>
                <AppNavBar
                icon={flash ? "flash" : "flash-off"}
                icon2={"image-plus"}
                onPress={() => setFlash(flash ? false : true)}
                />
                <AppCamButton title={'camera'} color={defaultStyles.colors.primary} onPress={() => capturePill(navigation, cameraRef, setLoading)} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbar: {
        position: 'absolute', 
    },
    noaccess: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CameraScreen;
