import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import 'firebase/firestore';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import ImageInput from '../components/ImageInput';
import { AppForm, AppFormField, AppFormPicker, SubmitButton, AppFormImagePicker } from '../components/forms';
import PickerItem from '../components/PickerItem';
import cache from '../cache/cache';

import MEDICINES from '../config/medicines.js';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    medicine: Yup.string().required().nullable().label("Medicine"),
    directions: Yup.string().label("Directions"),
});

function PrescriptionDetailsScreen({ navigation, route }) {
    
    const prescription = route.params

    // This state is used to track whether the loading spinner should be visible
    const [loading, setLoading] = useState(false); 
    
    const handleSubmit = async (values) => {
        // have function from cache folder which takes this object
        setLoading(true);
        console.log('adding prescription: ', values);

        if (firebase.auth().currentUser) {
            // user is signed in, load from firestore
            const user = firebase.auth().currentUser;
            console.log('User is signed in:, ', user.uid)

            const db = firebase.firestore();

            // we must update whole array, so we get the array first then set it with the appended new prescription
            db.collection("users").doc(user.uid).get()
            .then((doc) => {
                var firestoredList = doc.data().PrescriptionList;

                var idx = firestoredList.findIndex(prescription => prescription.id === values.id)
                firestoredList[idx] = values

                db.collection("users").doc(user.uid).set({
                    PrescriptionList: firestoredList
                }).then(() => {
                    console.log("Successful updating PrescriptionList in firestore");
                })
                .catch((error) => {
                    console.error("Error updating PrescriptionList in firestore: ", error);
                });
            })
            .catch((error) => {
                console.error("Error reading prescriptions from firestore: ", error);
            });
        }
        else {
            let storedList = await cache.get('PrescriptionList');
            
            // There should always be a prescriptionList stored in async storage when we are on this screen
            // but just in case we handle the case when there is none
            if (!storedList) {
                console.log('No prescriptions')
            }
            else {
                const idx = storedList.findIndex(prescription => prescription.id === values.id)
                storedList[idx] = values
    
                cache.store('PrescriptionList', storedList);
            }
        }

        // small timeout before going back to the prescriptions so list can refresh unseen
        navigation.goBack();
        setLoading(true);
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
                        'Prescription Details',
                        `This screen allows you to view or edit a specific prescription.
                        \nThis is your ${prescription.medicine} prescription.`,
                    )}
                />
                <ScrollView scrollEnabled={true}>
                    <View style={{flex: 1, padding: 10, marginBottom: 80}}>
                        <AppForm
                            initialValues={{
                                id: prescription.id,
                                date: `${prescription.date}`,
                                medicine: `${prescription.medicine}`,
                                directions: `${prescription.directions}`,
                                image: prescription.image,
                            }}
                            onSubmit={values => handleSubmit(values)}
                            validationSchema={validationSchema}
                        >
                            <AppFormImagePicker
                                name="image"
                                defaultUri={prescription.image}
                            />
                            <AppText style={styles.text}>Medicine Name</AppText>
                            <AppFormPicker
                                icon={"pill"}
                                items={MEDICINES}
                                name="medicine"
                                numberOfColumns={1}
                                PickerItemComponent={PickerItem}
                                placeholder="Medicine Name"
                            />
                            <AppText style={styles.text}>Directions</AppText>
                            <AppFormField
                                maxLength={255}
                                multiline
                                name="directions"
                                numberOfLines={5}
                                defaultValue={`${prescription.directions}`}
                                placeholder={`Directions for Use\nEg. "Take one pill 3 times a day"\n`}
                            />
                            <SubmitButton title="Save Changes" />
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

export default PrescriptionDetailsScreen;