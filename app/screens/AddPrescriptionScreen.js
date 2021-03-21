import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import AppWideButton from '../components/AppWideButton';
import ImageInput from '../components/ImageInput';


function AddPrescriptionScreen({ navigation }) {
  return (
    <Screen>
        <AppNavBar
            title={'Back'}
            title2={'Help'}
            icon={"chevron-left"}
            icon2={"help-circle-outline"}
            iconExtra={'prescription'}
            onPress={() => navigation.goBack()}
            onPress2={() => Alert.alert(
                'Add a Prescription',
                `This screen allows you to add a Prescription.`,
                )}
        />
        <ImageInput />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default AddPrescriptionScreen;