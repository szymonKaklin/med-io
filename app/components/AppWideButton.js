import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

import AppText from './AppText';

function AppWideButton({title, onPress, color = "primary"}) {
    return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors[color]}] } onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        width: '100%',
    },
    text: {
        color: colors.white,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default AppWideButton;