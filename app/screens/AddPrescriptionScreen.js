import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';
import moment from 'moment';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import ImageInput from '../components/ImageInput';
import { AppForm, AppFormField, AppFormPicker, SubmitButton, AppFormImagePicker } from '../components/forms';
import PickerItem from '../components/PickerItem';
import cache from '../cache/cache';

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
        <Screen>
            <ScrollView scrollEnabled={false}>
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
                <View style={{padding: 10}}>
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
                        <AppFormPicker
                            icon={"pill"}
                            items={MEDICINES}
                            name="medicine"
                            numberOfColumns={1}
                            PickerItemComponent={PickerItem}
                            placeholder="Select Medicine"
                        />
                        <AppFormField
                            maxLength={255}
                            multiline
                            name="directions"
                            numberOfLines={5}
                            placeholder={`Directions for Use\nEg. "Take one pill 3 times a day"`}
                        />
                        <SubmitButton title="Add New Prescription" />
                    </AppForm>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    picker: {
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
    },
});

export default AddPrescriptionScreen;