import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import AppText from './AppText';

function ImageInput({ name, defaultUri, onAddImage, smallImage }) {
    const [imageUri, onChangeImage] = useState();

    useEffect(() => {
        // if we have an image for this pescription, we load it into ImageInput here
        if (defaultUri)
            onChangeImage(defaultUri);
    }, [])

    const handlePress = () => {
        if (!imageUri) selectImage();
        else Alert.alert('Delete', 'Are you sure you want to delete this image?', [
            {
                text: 'Yes', onPress: () => 
                    { 
                        onChangeImage(null);
                        onAddImage('');
                    }
            },
            {
                text: 'No' 
            },
        ])
    };
    
    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
          })
          if (!result.cancelled)
            onChangeImage(result.uri);
            onAddImage(result.uri);
        } catch (error) {
          console.log('Error reading an image:', error);
        }
    };
  
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={smallImage ? styles.smallContainer : styles.container}>
            {!imageUri &&
            <>
              {!smallImage && <AppText>Add Image</AppText>}
              <MaterialCommunityIcons color={colors.medium} name="image-plus" size={40} />
            </>
            }
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 120,
        justifyContent: 'center',
        overflow: "hidden",
        width: 120,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    smallContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 80,
        justifyContent: 'center',
        overflow: "hidden",
        width: 80,
    }
});

export default ImageInput;
