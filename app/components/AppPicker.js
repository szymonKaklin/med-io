import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors';

import PickerItem from './PickerItem';
import AppText from './AppText';
import Screen from './Screen';
import ListItemSeperator from './ListItemSeperator';
import { Text } from 'react-native';

function AppPicker({
    icon,
    items,
    numberOfColumns = 1,
    onSelectItem,
    PickerItemComponent = PickerItem,
    placeholder,
    selectedItem,
    width = "100%",
}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }]}>
                    {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />}
                    { selectedItem ? (
                        // Text is used here instead of AppText because of a weird Android Bug which wouldnt render AppText
                        <Text style={styles.text}>{selectedItem}</Text>
                    ) : (
                        <AppText style={styles.placeholder}>{placeholder}</AppText>
                    )}
                    <MaterialCommunityIcons name="chevron-down" size={20} color={colors.medium} />
                </View>
            </TouchableWithoutFeedback>
            
            <Modal visible={modalVisible} animationType="slide" transparent>
                <Screen style={{flex: 1, flexDirection: 'column-reverse'}}>
                    <View style={styles.modalContent}>
                        <Button title="Close List" onPress={() => setModalVisible(false)} />
                        <FlatList
                            style={{borderTopWidth: 1, borderTopColor: colors.gray}}
                            data={items}
                            ItemSeparatorComponent={ListItemSeperator}
                            numColumns={numberOfColumns}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <PickerItemComponent
                                    item={item}
                                    onPress={() => {
                                        setModalVisible(false);
                                        // this is where the form is updated with the medicine title
                                        // format of medicines.js is important here
                                        onSelectItem(item.title); 
                                    }}
                                />
                            }
                        />
                    </View>
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    modalContent: {
        shadowOffset: {
            height: -30,
        },
        shadowOpacity: 0.2,
        shadowRadius: 35,
        backgroundColor: colors.white,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderRadius: 20,
        flexGrow: 1,
        maxHeight: '55%',
    },
    placeholder: {
        flex: 1,
        color: colors.gray,
    },
    text: {
        flex: 1,
        color: colors.dark,
        fontSize: 18,
        textAlignVertical: 'top',
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
});

export default AppPicker;