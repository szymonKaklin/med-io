import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';

import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import PrescriptionItem from '../components/PrescriptionItem';
import AppNavBar from '../components/AppNavBar';
import AppWideButton from '../components/AppWideButton';

const prescriptions = [
    {
        id: 1,
        title: 'Ibuprofen',
        date: '01/01/2021',
        image: require('../assets/ibuprofen_sample.jpg')
    },
    {
        id: 2,
        title: 'Paracetamol',
        date: '01/01/2021',
        image: require('../assets/paracetamol_sample.jpg')
    },
    {
        id: 3,
        title: 'Aspirin',
        date: '01/01/2021',
        image: require('../assets/aspirin_sample.jpg')
    }
]

function PrescriptionsScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <Screen style={styles.container}>
            <AppNavBar
                title={'Back'}
                title2={'Help'}
                icon={"chevron-left"}
                icon2={"help-circle-outline"}
                iconExtra={'menu'}
                onPress={() => navigation.goBack()}
                onPress2={() => Alert.alert(
                    'My Prescriptions',
                    `This screen allows you to view, edit, and add prescriptions.
                    \n Tap the 'Add New Prescription' button at the bottom of the screen to add a new prescription.
                    \n Tap a specific prescription to edit it.
                    \n Tap the red trash icon in the corner of a prescription to remove it.
                    \n Tap the top left 'Back' button to return to the main menu.`,
                    )}
            />
            <View style={styles.list}>
                <FlatList
                    data={prescriptions}
                    keyExtractor={prescription => prescription.id.toString()}
                    renderItem={({item}) => 
                        <PrescriptionItem
                            title={item.title}
                            subTitle={"Added: " + item.date}
                            image={item.image}
                            onPress={() => navigation.navigate('PrescriptionDetails', item)}
                        />
                    }
                    refreshing={refreshing}
                    onRefresh={() => console.log('refreshing prescriptions')}
                />
            </View>
            <View>
                <AppWideButton title={"Add New Prescription"} onPress={() => navigation.navigate('AddPrescription')}/>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    addButton: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        backgroundColor: defaultStyles.colors.lightGray
    },
    list: {
        flex: 1,
        padding: 5,
    }
})

export default PrescriptionsScreen;