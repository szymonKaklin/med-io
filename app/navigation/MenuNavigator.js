import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../screens/MenuScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import AddPrescriptionScreen from '../screens/AddPrescriptionScreen';
import PrescriptionDetailsScreen from '../screens/PrescriptionDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import CameraScreen from '../screens/CameraScreen';

const MenuStack = createStackNavigator();

const MenuNavigator = () => (
    <MenuStack.Navigator headerMode={'none'} screenOptions={{gestureEnabled: false}}>
        <MenuStack.Screen name="Menu" component={MenuScreen}/>
        <MenuStack.Screen name="Camera" component={CameraScreen}/>
        <MenuStack.Screen name="Login" component={LoginScreen}/>
        <MenuStack.Screen name="Prescriptions" component={PrescriptionsScreen} />
        <MenuStack.Screen name="AddPrescription" component={AddPrescriptionScreen} />
        <MenuStack.Screen name="PrescriptionDetails" component={PrescriptionDetailsScreen} />
    </MenuStack.Navigator>
);

export default MenuNavigator;