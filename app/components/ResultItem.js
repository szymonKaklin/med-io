import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';
import { ScrollView } from 'react-native';

function ResultItem({title, image, prescription}) {
    
    // This returns if a title is present, ie. a medicine has been identified
    if (title)
    {
        return (
            <ScrollView>
                <View style={prescription ? styles.containerGreen : styles.containerYellow}>
                    {image && <Image style={styles.image} source={{ uri: image}} />}
                    <View style={styles.verticalSplit}>
                        <View style={styles.icon}>
                            {prescription ? 
                                (<MaterialCommunityIcons name="check" color={'darkgreen'} size={70} />) 
                                : 
                                (<MaterialCommunityIcons name="magnify-plus" color={'black'} size={55} />)
                            }
                            <AppText
                                style={styles.title, 
                                    {fontSize: title.length < 9 ? 50 : 50*(9/title.length)}}
                            >
                                {title}
                            </AppText>
                        </View>
                    </View>
                    <View style={styles.textContent}>
                        <View style={styles.containerText}>
                        <AppText style={styles.textHeading}>Directions:</AppText>
                            {prescription ? 
                                (<AppText style={{fontSize: 25, textAlign: 'left'}}>{prescription.directions}</AppText>) 
                                : 
                                (<AppText style={styles.text}>This medicine has been identified, but you don't have a prescription for it.</AppText>)
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
    
    // no title, means that we havent identified a medicine
    return (
        <ScrollView>
            <View style={styles.container}>
                {image && <Image style={styles.image} source={{ uri: image}} />}
                <View style={styles.verticalSplit}>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons name="close" color={'red'} size={70} />
                        <AppText style={{fontSize: 40}}>Not Identified</AppText>
                    </View>
                </View>
                <View style={styles.textContent}>
                    <View style={styles.containerText}>
                        <AppText style={[styles.text, {textAlign: 'center'}]}>No medicine could be identified in this picture. Please try again.</AppText>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 270,
        backgroundColor: defaultStyles.colors.primaryLight,
    },
    containerGreen: {
        backgroundColor: defaultStyles.colors.correctGreen,
    },
    containerYellow: {
        backgroundColor: defaultStyles.colors.maybeYellow,
    },
    containerText: {
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 20,
        width: '100%',
        padding: 15,
        marginVertical: 0,
    },
    icon: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        //alignSelf: "center",
        width: "100%",
        height: 200,
    },
    subTitle: {
        color: defaultStyles.colors.secondary,
        fontWeight: "bold", 
    },
    textContent: {
        backgroundColor: defaultStyles.colors.lightGray,
        padding: 5,
    },
    text: {
        textAlign: 'left',
        fontSize: 25,
    },
    textHeading: {
        textAlign: 'left',
        fontSize: 25,
        color: defaultStyles.colors.primary,
        // marginTop: 5,
        // marginLeft: 2,
        fontWeight: '800',
    },
    verticalSplit: {
        flexDirection: 'row',
    },
});

export default ResultItem;