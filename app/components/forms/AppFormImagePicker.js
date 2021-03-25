import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import ImageInput from '../ImageInput';

function AppFormImagePicker({ name }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    
    var imageUri = values[name];

    const handleAdd = uri => {
        // Fix is to check if its undefined (ie. an empty array)
        if (typeof imageUri === 'undefined') {
            // set it to an empty array
            imageUri = null;
        }
        setFieldValue(name, uri);
    }
    
    return (
    <>
        <ImageInput
            imageUri={imageUri}
            onAddImage={handleAdd}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormImagePicker;