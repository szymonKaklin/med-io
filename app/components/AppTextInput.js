import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import defaultStyles from '../config/styles';

function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
                {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.black} style={styles.icon} />}
                <TextInput
                    style={defaultStyles.text}
                    onSubmitEditing={() => console.log('submit')}
                    onPressOut={() => console.log('press out')}
                    onPressIn={() => console.log('press out')}
                    {...otherProps}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
})

export default AppTextInput;