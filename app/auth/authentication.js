import * as firebase from 'firebase';

const signUserIn = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

const registerUser = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export default {
    signUserIn,
    registerUser,
};

