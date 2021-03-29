import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import ImageInput from '../components/ImageInput';
import { AppForm, AppFormField, AppFormPicker, SubmitButton, AppFormImagePicker } from '../components/forms';
import PickerItem from '../components/PickerItem';
import cache from '../cache/cache';

import MEDICINES from '../config/medicines.js';

const validationSchema = Yup.object().shape({
    medicine: Yup.string().required().nullable().label("Medicine"),
    directions: Yup.string().label("Directions"),
});

function PrescriptionDetailsScreen({ navigation, route }) {
    const prescription = route.params

    const handleSubmit = async (values) => {
        // have function from cache folder which takes this object
        console.log('adding prescription: ', values);
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
                        'Prescription Details',
                        `This screen allows you to view or edit a specific prescription.
                        \nThis is your ${prescription.medicine} prescription.`,
                    )}
                />
                <View style={{padding: 10}}>
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
                        <AppFormPicker
                            icon={"pill"}
                            items={MEDICINES}
                            name="medicine"
                            numberOfColumns={1}
                            PickerItemComponent={PickerItem}
                            placeholder="Medicine Name"
                        />
                        <AppFormField
                            maxLength={255}
                            multiline
                            name="directions"
                            numberOfLines={5}
                            defaultValue={`${prescription.directions}`}
                            placeholder={`Directions for Use\nEg. "Take one pill 3 times a day"`}
                        />
                        <SubmitButton title="Save Changes" />
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

export default PrescriptionDetailsScreen;