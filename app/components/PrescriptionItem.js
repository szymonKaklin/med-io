import React, {useState} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';
import cache from '../cache/cache';

function PrescriptionItem({id, title, subTitle, image, onPress /*onRemoved*/}) {

    const handleRemove = () => {
        cache.removePrescription(id);
        //onRemoved(true);
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image} />
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
        width: "80%",
        height: 200,
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