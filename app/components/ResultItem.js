import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';

function ResultItem({title, image, prescription}) {
    
    // This returns if a title is present, ie. a medicine has been identified
    if (title)
    {
        return (
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
                    {prescription ? 
                        (<AppText style={styles.text}>{prescription.directions}</AppText>) 
                        : 
                        (<AppText style={styles.text}>This medicine has been identified, but you don't have a prescription for it.</AppText>)
                    }
                </View>
            </View>
        );
    }
    
    // no title, means that we havent identified a medicine
    return (
        <View style={styles.container}>
            {image && <Image style={styles.image} source={{ uri: image}} />}
            <View style={styles.verticalSplit}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name="close" color={'red'} size={70} />
                    <AppText style={{fontSize: 40}}>Not Identified</AppText>
                </View>
            </View>
            <View style={styles.textContent}>
                <AppText style={styles.text}>No medicine could be identified in this picture. Please try again.</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 270,
        backgroundColor: defaultStyles.colors.primaryLight,
    },
    containerGreen: {
        height: 270,
        backgroundColor: defaultStyles.colors.correctGreen,
    },
    containerYellow: {
        height: 270,
        backgroundColor: defaultStyles.colors.maybeYellow,
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
        padding: 5,
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
    },
    verticalSplit: {
        flexDirection: 'row',
    },
});

export default ResultItem;