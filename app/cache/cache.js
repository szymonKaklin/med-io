import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = 'cache';

// with this we can store can store something in asyncstorage
const store = async (key, values) => {
    try {
        await AsyncStorage.setItem(prefix + key, JSON.stringify(values));
    } catch (error) {
        console.log(error);
    }
};

// with this we can retrieve something from asyncstorage
const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value)

        if (!item) return null;
    
        return item;
    
    } catch (error) {
        console.log(error);
    }   
}

const removePrescription = async (id) => {
    try {
        const data = await AsyncStorage.getItem(prefix + 'PrescriptionList');
        const array = JSON.parse(data)

        const newArray = array.filter((item) => (item.id !== id) );

        await AsyncStorage.setItem(prefix + 'PrescriptionList', JSON.stringify(newArray));

    } catch (error) {
        console.log(error)
    }
}

export default {
    store,
    get,
    removePrescription,
};