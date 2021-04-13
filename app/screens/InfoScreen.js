import React from 'react';
import { View, StyleSheet, Alert, ScrollView, FlatList, SectionList } from 'react-native';

import PickerItemComponent from '../components/PickerItem'
import ListItemSeperator from '../components/ListItemSeperator';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppNavBar from '../components/AppNavBar';

import MEDICINES from '../config/medicines';
import colors from '../config/colors';

function InfoScreen({ navigation }) {
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
                    'Info Screen',
                    `Find out more about the app!`,
                    )}
            />
            <ScrollView scrollEnabled={true}>
                <View style={{flex: 1, padding: 10, marginBottom: 80}}>
                    <AppText style={styles.text}>What is Med.io?</AppText>
                    <View style={[styles.textBox, {flexDirection: 'column'}]}>
                        <AppText>
                            Med.io is an app designed to make identifying medicines easier. Its purpose 
                            is to help users who may be required to take many prescribed medicines each day
                            have an easier and safer experience following their prescriptions.
                            {'\n'}
                        </AppText>
                        <AppText style={{fontWeight: '800'}}>
                            DISCLAIMER: This early version of the app serves as a proof of concept, and any
                            identification results given by the app should NOT be taken as guidance, as they
                            may not be correct. 
                        </AppText>
                    </View>
                    <AppText style={styles.text}>Supported Medicines</AppText>
                    <View style={[styles.textBox, {flexDirection: 'column'}]}>
                        {MEDICINES.map((item) => (
                            <>
                            <View style={{padding: 5}}>
                                <AppText>{item.title}</AppText>
                            </View>
                                <ListItemSeperator/>
                            </>
                        ))}
                    </View>
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
    textBox: {
        backgroundColor: colors.white,
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },
})

export default InfoScreen;