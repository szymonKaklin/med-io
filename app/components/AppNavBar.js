import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppText from './AppText';

function AppNavBar({title, title2, onPress, onPress2, color = "primary", color2 = "primaryDark", icon, icon2, iconExtra, iconExtra2}) {
    return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color]}] } onPress={onPress}>
            {icon && <MaterialCommunityIcons name={icon} color={colors.white} size={45}/>}
            {iconExtra && <MaterialCommunityIcons name={iconExtra} color={colors.white} size={25}/>}
            <AppText style={[styles.text, { paddingLeft: 10 }]}>{title}</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color2]}] } onPress={onPress2}>
            <AppText style={styles.text}>{title2}</AppText>
            {iconExtra2 && <MaterialCommunityIcons name={iconExtra2} color={colors.white} size={25}/>}
            {icon2 && <MaterialCommunityIcons name={icon2} color={colors.white} size={45}/>}
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        padding: 12,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.white,
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default AppNavBar;