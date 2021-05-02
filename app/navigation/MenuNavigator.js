import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../screens/MenuScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import AddPrescriptionScreen from '../screens/AddPrescriptionScreen';
import PrescriptionDetailsScreen from '../screens/PrescriptionDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const MenuStack = createStackNavigator();

// If you are in menu navigator, and go to 'Prescriptions', you are taken here
const NestedPrescriptions = () => (
    <MenuStack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
        <MenuStack.Screen name="Prescriptions" component={PrescriptionsScreen}/>
        <MenuStack.Screen name="PrescriptionDetails" component={PrescriptionDetailsScreen}/>
        <MenuStack.Screen name="AddPrescription" component={AddPrescriptionScreen}/>
    </MenuStack.Navigator>
)

const MenuNavigator = () => (
    <MenuStack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
        <MenuStack.Screen name="Menu" component={MenuScreen}/>
        <MenuStack.Screen name="Camera" component={CameraScreen}/>
        <MenuStack.Screen name="Login" component={LoginScreen}/>
        <MenuStack.Screen name="Register" component={RegisterScreen}/>
        <MenuStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        <MenuStack.Screen name="Info" component={InfoScreen}/>
        <MenuStack.Screen name="Settings" component={SettingsScreen}/>
        <MenuStack.Screen name="Prescriptions" component={NestedPrescriptions}/>
    </MenuStack.Navigator>
);

export default MenuNavigator;