import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import * as firebase from 'firebase';
import 'firebase/firestore';


import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';

import defaultStyles from '../config/styles'
import ResultItem from '../components/ResultItem';
import AppWideButton from '../components/AppWideButton';
import cache from '../cache/cache';

import MEDICINES from '../config/medicines';
import { Alert } from 'react-native';

function ResultScreen({ route, navigation }) {

    // Load the parameters send from the camera screen giving information about the pill from the server and the captured image
    const { medicineID, image: imageURI } = route.params;
    
    // Set variable to medicine object that was found/null
    const [foundMedicine, setFoundMedicine] = useState(null);

    // Set variable to prescription object that was found/null
    const [foundPrescription, setFoundPrescription] = useState(null);

    const loadPrescription = async (title) => {
        // check if user is signed in
        if (firebase.auth().currentUser) {
            const user = firebase.auth().currentUser;
            console.log('User is signed in: loading from firestore')

            const db = firebase.firestore();

            // getting PrescriptionList from firestore and trying to find medicineID
            db.collection("users").doc(user.uid).get()
            .then((doc) => {
                var firestoredList = doc.data().PrescriptionList;

                // finding first maching prescription entry
                const found = firestoredList.find(prescription => prescription.medicine === title)
                setFoundPrescription(found);
            })
            .catch((error) => {
                console.error("Error reading prescriptions from firestore: ", error);
            });
        }
        else {
            console.log('Loading prescriptions from storage');
            const data = await cache.get('PrescriptionList');
            
            if (!data) {
                // no prescription found :(
                setFoundPrescription(null);
            }
            else {
                // currently we just find the first matching prescription entry and output that
                const found = data.find(prescription => prescription.medicine === title)
                setFoundPrescription(found);
            }
        }
    };

    // Checking for the identified medicine in medicines.js on screen load
    useEffect(() => {
        let found = MEDICINES.find(medicine => medicine.id === medicineID );
    
        if (found) {
            setFoundMedicine(found)
            
            // having found a medicine, we can also search for its prescription(s)
            loadPrescription(found.title);
        }

    }, [])
    
    return (
        <Screen style={styles.screen}>
            <AppNavBar
                title={'Back'}
                title2={'Help'}
                icon={"chevron-left"}
                icon2={"help-circle-outline"}
                iconExtra={'camera'}
                onPress={() => navigation.goBack()}
                onPress2={() => Alert.alert(
                    'Result Screen',
                    `This screen shows you the result of the attempted medicine identification.
                    \nDISCLAIMER: THE RESULT OF THE IDENTIFICATION MAY NOT BE ACCURATE.`
                )}
            />
            {foundMedicine ? <ResultItem title={foundMedicine.title} prescription={foundPrescription} image={imageURI}/> : <ResultItem image={imageURI}/>}
            <View style={styles.container}>
                {foundMedicine ?
                    (<AppWideButton
                        color={'primary'}
                        title={foundPrescription ? 'Go to Prescription' : 'Add Prescription'} 
                        onPress={() => {
                            navigation.goBack();
                            navigation.dispatch({
                                ...CommonActions.navigate('Menu', {
                                    screen: 'Prescriptions',
                                    initial: false,
                                    params: {
                                        screen: foundPrescription ? 'PrescriptionDetails' : 'AddPrescription',
                                        params: foundPrescription ? foundPrescription : foundMedicine.title,
                                        initial: false,
                                    }
                                }),
                            })
                        }}
                    />)
                    :
                    (<AppWideButton color={'primaryDark'} title={'Retry'} onPress={() => navigation.goBack()}/>)
                }
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'flex-end',
    },
    resultImage: {
        overflow: "hidden",
        resizeMode: "contain",
        alignSelf: "center",
        width: "100%",
        height: "90%",
        //marginTop: 10,
    },
    screen: {
        flex: 1,
        backgroundColor: defaultStyles.colors.lightGray
    }
});

export default ResultScreen;