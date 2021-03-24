import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';

import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import PrescriptionItem from '../components/PrescriptionItem';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import AppWideButton from '../components/AppWideButton';
import cache from '../cache/cache';

// const prescriptions_test = [
//     {
//         //id: 1,
//         medicine: 'Ibuprofen',
//         //date: '01/01/2021',
//         directions: 'Take 3-4 times a day.\n Do not exceed 5 doses.',
//         //image: require('../assets/ibuprofen_sample.jpg')
//     },
//     {
//         //id: 2,
//         medicine: 'Paracetamol',
//         //date: '01/01/2021',
//         directions: '',
//         //image: require('../assets/paracetamol_sample.jpg')
//     },
//     {
//         //id: 3,
//         medicine: 'Aspirin',
//         //date: '01/01/2021',
//         directions: '',
//         //image: require('../assets/aspirin_sample.jpg')
//     }
// ]

// console.log('initialising prescriptionList to an empty array')
// cache.store('PrescriptionList', []);

function PrescriptionsScreen({ navigation }) {

    const [prescriptions, setPrescriptions] = useState([]); // sets the prescriptions variable - initially an empty array
    const [refreshing, setRefreshing] = useState(false);
    
    const loadPrescriptions = async () => {
        console.log('Loading prescriptions from storage');
        const data = await cache.get('PrescriptionList');
        console.log(data);
        setPrescriptions(data);
        console.log(prescriptions);
    };
    
    // Everytime we see this screen, we load the prescriptions stored in asyncstorage
    useEffect(() => {
        // tying this to navigation means the screen re-loads prescriptions when it comes into focus
        const unsubscribe = navigation.addListener('focus', () => {
            loadPrescriptions();
        })
        return unsubscribe;
    }, [navigation])
    
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
                {!prescriptions &&
                    <View style={styles.noPrescriptions}>
                        <AppText style={{fontSize: 30, textAlign: 'center'}}>Your prescriptions list is currrently empty.</AppText>
                    </View>
                }
                <FlatList
                    data={prescriptions}
                    keyExtractor={prescription => prescription.id.toString()}
                    renderItem={({item}) => 
                        <PrescriptionItem
                            title={item.medicine}
                            subTitle={"Added: " + item.date}
                            image={item.image}
                            onPress={() => navigation.navigate('PrescriptionDetails', item)}
                        />
                    }
                    refreshing={refreshing}
                    onRefresh={() => {
                        console.log('refreshing prescriptions');
                        setRefreshing(true);
                        // do whatever
                        setRefreshing(false);
                    }}
                />
            </View>
            <View>
                <AppWideButton
                    title={"Add New Prescription"}
                    onPress={() => {
                        navigation.navigate('AddPrescription')
                    }}
                />
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
    },
    noPrescriptions: {
        //backgroundColor: 'yellow',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default PrescriptionsScreen;