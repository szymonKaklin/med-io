import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import { AppForm, SubmitButton, AppFormImagePicker } from '../components/forms';

import colors from '../config/colors';

// Posts image(s) to server
const handleSubmit = async (values, navigation, setLoading) => {
    // Count number of images selected
    var keys = Object.keys(values)
    var numberOfImages = 0;
    var localUri;
    for (var i = 0; i < keys.length; i++) {
        if (values[keys[i]] !== '') {
            numberOfImages++
            localUri = values[keys[i]]
        }
    }

    new Promise((resolve, reject) => {
        if (numberOfImages === 1) {
            setLoading(true)
            console.log('post normally')
            
            // Get the filename from the path
            let filename = localUri.split('/').pop(); 

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append('file', { uri: localUri, name: filename, type });

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
                Alert.alert(
                    'Failed to Post Image', 
                    `We couldn't access the server, check your phone's internet connection and try again`,
                    [
                        {
                            text: 'Dismiss',
                        },
                    ],
                )
            })
        }
        else if (numberOfImages === 7) {
            setLoading(true)
            console.log('post 7')
        }

    }).then(response => {
        response.json().then(result => {        
            // This is where we would handle the response by navigating to appropriate result
            setLoading(false); // stop the loading spinner

            // The model returns the confidence as logsoftmax (this is a strange function with a negative value).
            // If the confidence is more positive than -1 we assume the prediction is correct. Otherwise there is no prediction.
            // This assumption needs tuning
            let medicineID = result.confidence > -1 ? result.label : null;

            // Navigate to the results page sending the id of the medicine and the image as parameters
            navigation.navigate('Result', { medicineID, image: localUri });
        })
    }).catch(error => {
        console.log('The image was posted, but server response failed:', error)
    })
}

function ImageLibraryScreen({ navigation }) {

    // This state is used to track whether the loading spinner should be visible
    const [loading, setLoading] = useState(false); 

    return (
        <Screen style={styles.screen}>
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.primary} animating={loading}/>
            </View>
            <AppNavBar
                title={'Back'}
                title2={'Help'}
                icon={"chevron-left"}
                icon2={"help-circle-outline"}
                iconExtra={'camera'}
                onPress={() => navigation.goBack()}
                onPress2={() => Alert.alert(
                    'Image Selection',
                    `This screen allows you to identify a pill using an image from you phone's image library.
                    \nAlternatively, you can select 7 images to use our spectral imaging model.`
                )}
            />
            {loading && 
            <View style={[styles.loading, {bottom: 250}]}>
                <AppText style={[styles.text, {padding: 25}]}>Identifying Pill...</AppText>
            </View>}
            {!loading && <ScrollView scrollEnabled={true}>
                <View style={{flex: 1, padding: 10}}>
                    <AppText style={styles.text}>Select 1 or 7 Image(s)</AppText>
                    <AppForm
                        initialValues={{
                            image1: ``,
                            image2: ``,
                            image3: ``,
                            image4: ``,
                            image5: ``,
                            image6: ``,
                            image7: ``,
                        }}
                        onSubmit={values => handleSubmit(values, navigation, setLoading)}
                    >
                        <View style={styles.imageInputs}>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image1" smallImage={true} />
                            </View>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image2" smallImage={true}/>
                            </View>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image3" smallImage={true}/>
                            </View>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image4" smallImage={true}/>
                            </View>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image5" smallImage={true}/>
                            </View>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image6" smallImage={true}/>
                            </View>
                            <View style={{padding: 4}}>
                                <AppFormImagePicker name="image7" smallImage={true}/>
                            </View>
                        </View>
                        <SubmitButton title="Post Images To Server"/>
                    </AppForm>
                </View>
            </ScrollView>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageInputs: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        //backgroundColor: 'green',
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
    screen: {
        flex: 1,
        backgroundColor: colors.lightGray
    },
    text: {
        fontSize: 25,
        fontWeight: '800',
        color: colors.primary,
    },
});

export default ImageLibraryScreen;