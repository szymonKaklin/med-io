import React from 'react';
import { ScrollView, StyleSheet, Image, View, Alert } from 'react-native';
import * as Yup from 'yup';
import * as firebase from 'firebase';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';

import defaultStyles from '../config/styles';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen({ navigation }) {
    
    const handleSend = (values) => {
        firebase.auth().sendPasswordResetEmail(values.email)
            .then(() => {
                console.log('Successfully sent email: ', values.email);
                navigation.navigate('Menu')
            })
            .catch((error) => {
                // Error creating user
                console.log('Error sending email. Error code: ', error.code)
                console.log('Error message: ', error.message)

                Alert.alert(
                    'Failed to send code',
                    `${error.message}`,
                )
            });
    }
    
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
                    'Reset Password Screen',
                    `This screen allows you to reset your account password.
                    \nTo do so, enter your account email in the corresponding field, and tap 'Send Reset Link'.
                    \nUse this link to reset your password.`
                    )}
            />
            <ScrollView scrollEnabled={true}>
                <Image
                    style={styles.logo}
                    source={require("../assets/medio_logo.png")}
                />
                <AppText style={styles.text}>Send Password Reset Link</AppText>
                <View style={{padding: 10, paddingTop: 20}}>
                    <AppForm
                        initialValues={{email: ''}}
                        onSubmit={handleSend}
                        validationSchema={validationSchema}
                    >
                        <AppFormField
                            autoCapitalize="none"
                            errorColor="white"
                            autoCorrect={false}
                            icon="email"
                            name="email"
                            placeholder="Email" // right now you have to click on the placeholder to type
                            keyboardType="email-address"
                            textContentType="oneTimeCode"
                        />
                        <SubmitButton title="Send Reset Link" />
                    </AppForm>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyles.colors.primaryLight,
    },
    logo: {
        resizeMode: 'contain',
        width: "90%",
        height: "40%",
        marginLeft: 5,
        paddingTop: 90,
        alignSelf: 'center',
        //backgroundColor: 'yellow',
        overflow: 'visible',
    },
    text: {
        alignSelf: 'center',
        color: defaultStyles.colors.white,
        fontSize: 25,
    },
})

export default ForgotPasswordScreen;