import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import * as firebase from 'firebase';

import Screen from '../components/Screen';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import AppNavBar from '../components/AppNavBar';
import ListItemSeperator from '../components/ListItemSeperator';

import defaultStyles from '../config/styles';

const menuItems = [
    {
        title: "My Prescriptions",
        icon: {
            name: "prescription",
            backgroundColor: defaultStyles.colors.primary,
        },
        targetScreen: "Prescriptions",
    },
    {
        title: "Info",
        icon: {
            name: "help",
            backgroundColor: defaultStyles.colors.secondary,
        }
    },
    {
        title: "Settings",
        icon: {
            name: "settings",
            backgroundColor: defaultStyles.colors.secondaryDark,
        }
    }
]

function MenuScreen({ navigation }) {
    
    const [userEmail, setUserEmail] = useState(null)

    useEffect(() => {
        // Checking is user is signed in on screen render
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log('User is signed in')
                setUserEmail(user.email);
            }
        });
    }, []);
    
    return (
        <Screen style={styles.screen}>
            <AppNavBar
                title={'Back'}
                title2={'Help'}
                icon={"chevron-left"}
                icon2={"help-circle-outline"}
                iconExtra={'camera'}
                onPress={() => navigation.goBack()}
                onPress2={() => Alert.alert(
                    'Main Menu',
                    `Tap the top left 'Back' button to return to the camera screen.
                    \n'Tap to Login' allows you to login or register an account, allowing you to store your prescriptions across devices.
                    \nTapping 'My Prescriptions' will take you to a list of your prescriptions, where you can view, edit or add new prescriptions.
                    \nTapping 'Info' will give you more information regarding the app, whilst 'Settings' will allow you to configure the app.`,
                    )}
            />
            <View style={styles.container}>
                {userEmail ? 
                (<ListItem
                    title="Tap to Log Out"
                    subTitle={userEmail}
                    IconComponent={
                        <Icon
                            name={'account-check'}
                            backgroundColor={defaultStyles.colors.primaryLight}
                            size={70}
                        />}
                    onPress={() => {
                        firebase.auth().signOut();
                        setUserEmail(null)
                        navigation.navigate('Login');
                    }}
                />) 
                : 
                (<ListItem
                    title="Tap to Login"
                    IconComponent={
                        <Icon
                            name={'account-question-outline'}
                            backgroundColor={defaultStyles.colors.gray}
                            size={70}
                        />}
                    onPress={() => navigation.navigate('Login')}
                />)}
            </View>
            <View style={styles.container}>
                <FlatList 
                    data={menuItems}
                    keyExtractor={(menuItem) => menuItem.title}
                    ItemSeparatorComponent={ListItemSeperator}
                    renderItem={({ item }) => 
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                    scrollEnabled={false}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: defaultStyles.colors.lightGray,
    }
})

export default MenuScreen;