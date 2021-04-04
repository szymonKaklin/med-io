import * as firebase from 'firebase';

const registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log('Successfully created new user: ', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            console.log('Error creating new user. Error code: ', error.code)
            console.log('Error message: ', error.message)
        });
}

export default {
    registerUser,
};

