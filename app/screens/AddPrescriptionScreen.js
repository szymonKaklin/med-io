import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import ImageInput from '../components/ImageInput';
import { AppForm, AppFormField, AppFormPicker, SubmitButton } from '../components/forms';
import PickerItem from '../components/PickerItem';

import MEDICINES from '../config/medicines.js';

const validationSchema = Yup.object().shape({
    medicine: Yup.string().required().nullable().label("Medicine"),
    directions: Yup.string().label("Directions"),
});

function AddPrescriptionScreen({ navigation }) {
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
                <ImageInput />
                    <AppForm
                        initialValues={{medicine: ``, directions: ``}}
                        onSubmit={values => console.log(values)}
                        validationSchema={validationSchema}
                    >
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