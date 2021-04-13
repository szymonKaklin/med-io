import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppNavBar from '../components/AppNavBar';

import colors from '../config/colors';
import appjson from '../../app.json';

function SettingsScreen({ navigation }) {
    return (
        <Screen style={styles.screen}>
            <AppNavBar
                title={'Back'}
                title2={'Help'}
                icon={"chevron-left"}
                icon2={"help-circle-outline"}
                iconExtra={'menu'}
                onPress={() => navigation.goBack()}
                onPress2={() => Alert.alert(
                    'Settings Screen',
                    `This screen can be used to configure various aspects of the app.`,
                    )}
            />
            <ScrollView scrollEnabled={true}>
                <View style={{flex: 1, padding: 10, marginBottom: 80}}>
                    <AppText style={styles.text}>App Version: v{appjson.expo.version}</AppText>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    text: {
        marginTop: 5,
        marginLeft: 2,
        fontSize: 25,
        fontWeight: '800',
        color: colors.primary,
    },
})

export default SettingsScreen;