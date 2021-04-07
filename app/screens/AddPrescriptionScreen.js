import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import moment from 'moment';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import 'firebase/firestore';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import { AppForm, AppFormField, AppFormPicker, SubmitButton, AppFormImagePicker } from '../components/forms';
import PickerItem from '../components/PickerItem';
import cache from '../cache/cache';

import colors from '../config/colors';
import MEDICINES from '../config/medicines.js';

const validationSchema = Yup.object().shape({
    medicine: Yup.string().required().nullable().label("Medicine"),
    directions: Yup.string().label("Directions"),
});

function AddPrescriptionScreen({ navigation, route }) {
    
    // Parameter which is passed to intial form values if we are coming from the camera screen having just identifed a pill
    const identifiedMedicine = route.params

    // This state is used to track whether the loading spinner should be visible
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (values) => {
        // have function from cache folder which takes this object
        setLoading(true);
        console.log('adding prescription: ', values);

        // check if user is signed in
        if (firebase.auth().currentUser) {
            // user is signed in, load from firestore
            const user = firebase.auth().currentUser;
            console.log('\tUser is signed in, adding to firestore...');

            const db = firebase.firestore();

            // appends a prescription object to the PrescriptionList field in firestore
            db.collection("users").doc(user.uid).update({
                PrescriptionList: firebase.firestore.FieldValue.arrayUnion(values)
            }).then(() => {
                console.log("\tSuccessful adding PrescriptionList to firestore");
            })
            .catch((error) => {
                console.error("\tError adding PrescriptionList to firestore: ", error);
            });
        }
        else {
            // no user signed in
            console.log('\tUser not signed in, adding to cache...');
            let storedList = await cache.get('PrescriptionList');
            
            if (!storedList) {
                cache.store('PrescriptionList', [values]);
            }
            else {
                cache.store('PrescriptionList', [...storedList, values]);
            }
        }

        navigation.goBack();
        setLoading(false);
    }
    
    return ( 
        <Screen style={styles.container}>
            <KeyboardAvoidingView style={{flex: 1, flexGrow: 1}} behavior={Platform.OS === 'ios' ? "position" : "height"}>
                <AppNavBar
                    title={'Back'}
                    title2={'Help'}
                    icon={"chevron-left"}
                    icon2={"help-circle-outline"}
                    iconExtra={'prescription'}
                    onPress={() => navigation.goBack()}
                    onPress2={() => Alert.alert(
                        'New Prescription',
                        `This screen allows you to create a new prescription.`,
                    )}
                />
                <ScrollView scrollEnabled={true}>
                    <View style={{flex: 1, padding: 10, marginBottom: 80}}>
                        <AppForm
                            initialValues={{
                                id: Date.now(),
                                date: `${moment().format('D/M/Y')}`,
                                medicine: identifiedMedicine ? `${identifiedMedicine}` : ``,
                                directions: ``,
                                image: ``,
                            }}
                            onSubmit={values => handleSubmit(values)}
                            validationSchema={validationSchema}
                        >
                            <AppFormImagePicker name="image" />
                            <AppText style={styles.text}>Medicine Name</AppText>
                            <AppFormPicker
                                icon={"pill"}
                                items={MEDICINES}
                                name="medicine"
                                numberOfColumns={1}
                                PickerItemComponent={PickerItem}
                                placeholder="Select Medicine"
                            />
                            <AppText style={styles.text}>Directions</AppText>
                            <AppFormField
                                maxLength={255}
                                multiline
                                name="directions"
                                numberOfLines={5}
                                placeholder={`Directions for Use\nEg. "Take one pill 3 times a day"\n`}
                            />
                            <SubmitButton title="Add New Prescription"/>
                        </AppForm>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {loading && <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.primary} animating={loading}/>
            </View>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    picker: {
        backgroundColor: 'white',
    },
    text: {
        marginTop: 5,
        marginLeft: 2,
        fontSize: 25,
        fontWeight: '800',
        color: colors.primary,
    },
    title: {
        fontSize: 30,
    },
});

export default AddPrescriptionScreen;