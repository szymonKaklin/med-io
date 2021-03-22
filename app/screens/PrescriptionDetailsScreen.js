import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import ImageInput from '../components/ImageInput';
import { AppForm, AppFormField, AppFormPicker, SubmitButton } from '../components/forms';
import PickerItem from '../components/PickerItem';

import MEDICINES from '../config/medicines.js';

function PrescriptionDetailsScreen({ navigation, route }) {
    const prescription = route.params

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
                        \nThis is your ${prescription.title} prescription.`,
                    )}
                />
                <ImageInput></ImageInput>
                <View style={{padding: 10}}>
                    <AppForm
                        initialValues={{medicine: `${prescription.title}`, directions: ''}}
                        onSubmit={values => console.log(values)}
                        //validationSchema={validationSchema}
                    >
                        {/* <AppPicker
                            icon={"pill"}
                            placeholder={"Medicine Name"}
                        /> */}
                        <AppFormPicker  //this has to be a picker component
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
                            numberOfLines={3}
                            placeholder={`Directions for Use\n`}
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