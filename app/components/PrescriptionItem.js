import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';
import cache from '../cache/cache';

function PrescriptionItem({item, id, title, subTitle, imageUri, onPress}) {
    
    // Used to tell if imageUri is pointing invalid image
    const [imageNotFound, setImageNotFound] = useState(false)

    const handleRemove = () => {
        if (firebase.auth().currentUser) {
            const user = firebase.auth().currentUser;

            const db = firebase.firestore();

            // appends a prescription object to the PrescriptionList field in firestore
            db.collection("users").doc(user.uid).update({
                PrescriptionList: firebase.firestore.FieldValue.arrayRemove(item)
            }).then(() => {
                console.log("Successful removing prescription from firestore");
            })
            .catch((error) => {
                console.error("Error removing prescription from firestore: ", error);
            });
        }
        else {
            cache.removePrescription(id);
        }
    };

    return (
        <View style={styles.card}>
            {(imageUri !== '') ?
                (
                    <View>
                        {imageNotFound ? 
                        (
                            <View style={styles.imageNotFound}>
                                <AppText style={{fontSize: 20, color: 'white'}}>Image not found on device</AppText>
                                <MaterialCommunityIcons name="image-off" color="white" size={130} />
                            </View>
                        ) : (
                            <Image style={styles.image} source={{uri: imageUri}} onError={() => setImageNotFound(true)} />
                        )}
                    </View>
                ) : (
                    <View style={styles.noImage}>
                        <FontAwesome5 name="prescription-bottle-alt" color="white" size={150} />
                    </View>
                )}
            <View style={styles.closeIcon}>
                <TouchableOpacity 
                    onPress={() => 
                        Alert.alert(
                            'Confirm Deletion',
                            `Are you sure you want to delete this ${title} prescription?`,
                            [
                                {
                                text: 'Yes',
                                onPress: () => handleRemove(),
                                },
                                {
                                text: 'No',
                                }
                            ],
                    )}
                >
                    <MaterialCommunityIcons name="trash-can-outline" color="red" size={40} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.verticalSplit}>
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        <AppText style={styles.subTitle}>{subTitle}</AppText>
                    </View>
                    <View style={styles.chevronIcon}>
                        <MaterialCommunityIcons name="chevron-right" color={colors.gray} size={85} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden'
    },
    closeIcon: {
        position: "absolute",
        top: 7,
        right: 7
    },
    chevronIcon: {
        flex: 1,
        alignSelf: "center",
        flexDirection: "row-reverse",
    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        alignSelf: 'center',
        width: "100%",
        height: 200,
    },
    imageNotFound: {
        backgroundColor: colors.gray,
        alignItems: 'center',
        width: "100%",
        height: 200,
        padding: 20,
    },
    noImage: {
        backgroundColor: colors.secondaryLight,
        alignSelf: 'center',
        width: "100%",
        height: 200,
        padding: 20,
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold", 
    },
    title: {
        marginBottom: 7,
    },
    verticalSplit: {
        flexDirection: 'row',
    },
})

export default PrescriptionItem;