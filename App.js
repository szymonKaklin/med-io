import React from 'react';
import * as firebase from 'firebase';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import CameraNavigator from './app/navigation/CameraNavigator';

// firebase config object - create a .js file with the config object provided by firebase in this location
import firebaseConfig from './app/auth/firebaseConfig';

// Initializing Firebase App if one is not initialized already
if (!firebase.apps.length) {
    // The function takes an input object which contains firebase api keys
    // This is not included with the project repo.
    firebase.initializeApp(firebaseConfig);
}

// Fix for putting up a status bar on iOS - defaults to light?
if (Platform.OS === 'ios') {
  StatusBar.setBarStyle('dark-content');
}

export default function App() {
  return (
    <NavigationContainer>
      <CameraNavigator />
    </NavigationContainer>
  );
};
