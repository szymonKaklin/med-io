import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import LoginScreen from './app/screens/LoginScreen';
import MenuScreen from './app/screens/MenuScreen';
import PrescriptionsScreen from './app/screens/PrescriptionsScreen';
import CameraScreen from './app/screens/CameraScreen';
import ResultScreen from './app/screens/ResultScreen';

import PrescriptionItem from './app/components/PrescriptionItem';
import Screen from './app/components/Screen';
import ListItem from './app/components/ListItem';
import AppNavBar from './app/components/AppNavBar';
import ResultItem from './app/components/ResultItem';
import ImageInput from './app/components/ImageInput';

import MenuNavigator from './app/navigation/MenuNavigator';
import CameraNavigator from './app/navigation/CameraNavigator';

// Fix for putting up a status bar on iOS - defaults to light?
if (Platform.OS === 'ios') {
  StatusBar.setBarStyle('dark-content');
}

export default function App() {
  return (
    <NavigationContainer>
      <CameraNavigator />
    </NavigationContainer>
    // <ImageInput />
  );
};
