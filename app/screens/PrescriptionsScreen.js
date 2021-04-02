import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';

import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import PrescriptionItem from '../components/PrescriptionItem';
import AppNavBar from '../components/AppNavBar';
import AppText from '../components/AppText';
import AppWideButton from '../components/AppWideButton';
import cache from '../cache/cache';


function PrescriptionsScreen({ navigation }) {

    const [prescriptions, setPrescriptions] = useState([]); // sets the prescriptions variable - initially an empty array
    const [refreshing, setRefreshing] = useState(false); // setting state of refresh when pulling up to refresh list

    const loadPrescriptions = async () => {
        console.log('Loading prescriptions from storage');
        const data = await cache.get('PrescriptionList');
        
        if (!data)
            setPrescriptions([]);
        else 
            setPrescriptions(data);
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
                    \nTap the 'Add New Prescription' button at the bottom of the screen to add a new prescription.
                    \nTap a specific prescription to edit it.
                    \nTap the red trash icon in the corner of a prescription to remove it.
                    \nTap the top left 'Back' button to return to the main menu.`,
                    )}
            />
            <View style={styles.list}>
                {(prescriptions.length === 0) &&
                    <View style={styles.noPrescriptions}>
                        <AppText style={{fontSize: 30, textAlign: 'center'}}>Your prescriptions list is currrently empty.</AppText>
                    </View>
                }
                <FlatList
                    data={prescriptions}
                    //extraData={update}
                    keyExtractor={prescription => prescription.id.toString()}
                    renderItem={({item}) => 
                        <PrescriptionItem
                            id={item.id}
                            title={item.medicine}
                            subTitle={"Added: " + item.date}
                            imageUri={item.image}
                            onPress={() => navigation.navigate('PrescriptionDetails', item)}
                            //onRemoved={setUpdate}
                        />
                    }
                    refreshing={refreshing}
                    onRefresh={() => {
                        console.log('refreshing prescriptions');
                        setRefreshing(true);
                        loadPrescriptions();
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