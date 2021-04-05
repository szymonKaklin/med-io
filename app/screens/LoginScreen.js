import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import defaultStyles from '../config/styles';
import authentication from '../auth/authentication';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
});

function LoginScreen({ navigation }) {
    
    const handleLogin = (values) => {
        authentication.signUserIn(values.email, values.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log('Signed in: ', user);
                navigation.goBack()
            })
            .catch((error) => {
                // Error signing in
                console.log('Error signing in. Error code: ', error.code)
                console.log('Error message: ', error.message)

                Alert.alert(
                    'Failed to Login',
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
                        'Login Screen',
                        `This screen allows you to login or register an account with us. Doing so allows you to store your prescriptions and settings across your devices.
                        \n To login, enter your account email and password in the corresponding fields, and tap 'Login'.
                        \n To register an account, tap the 'Register' button.
                        \n If you have forgotten your password, or simply cannot login, tap 'Forgot your password?' below the Register button.
                        \n Tap the top left 'Back' button to return to the main menu.`,
                        )}
                />
                <Image
                    style={styles.logo}
                    source={require("../assets/medio_logo.png")}
                />
                <View style={{padding: 10}}>
                    <AppForm
                        initialValues={{email: '', password: ''}}
                        onSubmit={handleLogin}
                        validationSchema={validationSchema}
                    >
                        <AppFormField
                            autoCapitalize="none"
                            errorColor="white"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email" // right now you have to click on the placeholder to type
                            textContentType="emailAddress" // ios only keychain email autofill 
                        />
                        <AppFormField
                            autoCapitalize="none"
                            errorColor="white"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Password" // right now you have to click on the placeholder to type
                            secureTextEntry
                            textContentType="password" // ios only keychain autofill
                        />
                        <SubmitButton title="Login" />
                    </AppForm>
                    <AppButton title="Register" color="secondaryDark" onPress={() => navigation.navigate('Register')}/>
                    <TouchableOpacity>
                        <AppText style={styles.text}>Forgot password?</AppText>
                    </TouchableOpacity>
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
        color: defaultStyles.colors.white,
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 20,
    },
})

export default LoginScreen;