import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../AppText';

function ErrorMessage({ error, color = "red", visible }) {
    if (!visible || !error) return null;
    return (
    <AppText style={{ color: color }}>{error}</AppText>
    );
}

export default ErrorMessage;