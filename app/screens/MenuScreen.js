import React from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';

import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import AppNavBar from '../components/AppNavBar';
import ListItemSeperator from '../components/ListItemSeperator';

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
                    \n 'Tap to Login' allows you to login or register an account, allowing you to store your prescriptions across devices.
                    \n Tapping 'My Prescriptions' will take you to a list of your prescriptions, where you can view, edit or add new prescriptions.
                    \n Tapping 'Info' will give you more information regarding the app, whilst 'Settings' will allow you to configure the app.`,
                    )}
            />
            <View style={styles.container}>
                <ListItem
                    title="Tap to Login"
                    //subTitle="szymon.kaklin@hotmail.co.uk"
                    image={require('../assets/icon.png')}
                    onPress={() => navigation.navigate('Login')}
                />
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