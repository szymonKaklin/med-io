import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import ImageInput from '../components/ImageInput';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';


function AddPrescriptionScreen({ navigation, route }) {
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
                    <AppText style={styles.title}>{prescription.title}</AppText>
                    <AppForm
                        initialValues={{medicine: `${prescription.title}`, directions: ''}}
                        onSubmit={values => console.log(values)}
                        //validationSchema={validationSchema}
                    >
                        <AppFormField  //this has to be a picker component
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="pill"
                            name="medicine"
                            placeholder="Medicine" // right now you have to click on the placeholder to type
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

export default AddPrescriptionScreen;