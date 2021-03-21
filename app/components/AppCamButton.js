import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppText from './AppText';

function AppCamButton({onPress, color = "primary"}) {
    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <AppText style={styles.text}>Take</AppText>
            <MaterialCommunityIcons name="camera" size={80} color={color} />
            <AppText style={styles.text}>Picture</AppText>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colors.black,
        position: 'absolute',
        height: 180,
        width: 180,
        bottom: 0,
        borderRadius: 90,
    },
    button: {
        backgroundColor: colors.white,
        borderWidth: 10,
        borderColor: colors.primary,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 180,
        width: 180,
        bottom: 0,
    },
    text: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default AppCamButton;