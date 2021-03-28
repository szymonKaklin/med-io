import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';
import PrescriptionDetailsScreen from '../screens/PrescriptionDetailsScreen'

import MenuNavigator from './MenuNavigator';

const Stack = createStackNavigator();

const CameraNavigator = () => (
    <Stack.Navigator headerMode={'none'} mode={'modal'} screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Camera" component={CameraScreen}/>
        <Stack.Screen name="Menu" component={MenuNavigator}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
    </Stack.Navigator>
);

export default CameraNavigator;