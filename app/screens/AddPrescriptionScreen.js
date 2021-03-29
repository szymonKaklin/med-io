import React from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import moment from 'moment';

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

    const handleSubmit = async (values) => {
        // have function from cache folder which takes this object
        console.log('adding prescription: ', values);
        let storedList = await cache.get('PrescriptionList');
        
        if (!storedList) {
            cache.store('PrescriptionList', [values]);
        }
        else {
            cache.store('PrescriptionList', [...storedList, values]);
        }

        // small timeout before going back to the prescriptions so list can refresh unseen
        setTimeout(() => navigation.goBack(), 200);
    }
    
    return ( 
        <Screen style={styles.container}>
            <KeyboardAvoidingView style={{flex: 1, flexGrow: 1}} behavior="position">
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
                    <View style={{padding: 10, marginBottom: 80}}>
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
                            <SubmitButton title="Add New Prescription" />
                        </AppForm>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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