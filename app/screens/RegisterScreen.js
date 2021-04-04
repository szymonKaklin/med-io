import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';

import defaultStyles from '../config/styles';
import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import authentication from '../auth/authentication';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
});

function RegisterScreen({ navigation }) {
    
    const handleRegister = (values) => {
        console.log(values.email)
        console.log(values.password)
        authentication.registerUser(values.email, values.password);
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
                    onPress={() => navigation.navigate('Menu')}
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
                            textContentType="password" // ios only keychain autofill
                            secureTextEntry={true}
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
        color: defaultStyles.colors.white,
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 20,
    },
})

export default RegisterScreen;