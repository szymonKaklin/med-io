import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';

import defaultStyles from '../config/styles';
import authentication from '../auth/authentication';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
});

function RegisterScreen({ navigation }) {
    
    const handleRegister = (values) => {
        authentication.registerUser(values.email, values.password)
            .then((userCredential) => {
                // Registers and signs in 
                var user = userCredential.user;
                console.log('Successfully created new user');
                navigation.navigate('Menu')
            })
            .catch((error) => {
                // Error creating user
                console.log('Error creating new user. Error code: ', error.code)
                console.log('Error message: ', error.message)

                Alert.alert(
                    'Failed Registering Account',
                    `${error.message}`,
                )
            });
    }
    
    return (
        <Screen style={styles.container}>
            <ScrollView scrollEnabled={false}>
                <AppNavBar
                    title={'Back'}
                    title2={'Help'}
                    icon={"chevron-left"}
                    icon2={"help-circle-outline"}
                    iconExtra={'menu'}
                    onPress={() => navigation.goBack()}
                    onPress2={() => Alert.alert(
                        'Register Screen',
                        `This screen allows you to register an account with us. Doing so allows you to store your prescriptions and settings across your devices.
                        \n To register, enter your chosen account email and password in the corresponding fields, and tap 'Register Account'.
                        \n Upon successful registration, you will be taken back to the main menu.
                        \n Tap the top left 'Back' button to return to the main menu.`,
                        )}
                />
                <Image
                    style={styles.logo}
                    source={require("../assets/medio_logo.png")}
                />
                <AppText style={styles.text}>Account Registration</AppText>
                <View style={{padding: 10}}>
                    <AppForm
                        initialValues={{email: '', password: ''}}
                        onSubmit={handleRegister}
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
                        <AppFormField
                            autoCapitalize="none"
                            errorColor="white"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Password" // right now you have to click on the placeholder to type
                            secureTextEntry={true}
                            textContentType="oneTimeCode"
                            keyboardType="default"
                        />
                        <SubmitButton title="Register Account" />
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
        width: 350,
        height: 150,
        alignSelf: 'center',
        // backgroundColor: 'yellow',
        overflow: 'visible',
    },
    text: {
        alignSelf: 'center',
        color: defaultStyles.colors.white,
        fontSize: 25,
    },
})

export default RegisterScreen;