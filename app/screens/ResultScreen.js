import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import AppNavBar from '../components/AppNavBar';

import defaultStyles from '../config/styles'
import ResultItem from '../components/ResultItem';
import AppWideButton from '../components/AppWideButton';

// For an identified prescription pill
// function ResultScreen(props) {
//     let add = false;
//   return (
//     <Screen style={styles.screen}>
//         <AppNavBar title={'Back'} title2={'Help'} icon={"chevron-left"} icon2={"help-circle-outline"} iconExtra={'camera'}/>
//         <ResultItem title={'IBUPROFEN'} subTitle={'Found'} image={require('../assets/sample_result.jpg')}/>
//         <View style={styles.container}>
//             <AppWideButton title={'Go to Prescription'}/>
//             {add && <AppWideButton color={'primaryDark'} title={'Add to prescription'}/>}
//         </View>
//     </Screen>
//   );
// }

// Identified but not in prescription
// function ResultScreen(props) {
//     let add = true;
//   return (
//     <Screen style={styles.screen}>
//         <AppNavBar title={'Back'} title2={'Help'} icon={"chevron-left"} icon2={"help-circle-outline"} iconExtra={'camera'}/>
//         <ResultItem title={'IBUPROFEN'} subTitle={'Found'} image={require('../assets/sample_result.jpg')}/>
//         <View style={styles.container}>
//             {/* <AppWideButton title={'Go to Prescription'}/> */}
//             {add && <AppWideButton color={'primaryDark'} title={'Add to prescriptions'}/>}
//         </View>
//     </Screen>
//   );
// }

// Not identified
function ResultScreen({ route, navigation }) {
    // For when we get a pill we want to add to prescriptions
    let add = true;

    // Load the parameters send from the camera screen giving information about the pill from the server and the captured image
    const { medicineID, image: imageURI } = route.params;

  return (
    <Screen style={styles.screen}>
        <AppNavBar
            title={'Back'}
            title2={'Help'}
            icon={"chevron-left"}
            icon2={"help-circle-outline"}
            iconExtra={'camera'}
            onPress={() => navigation.goBack()}
        />
        <ResultItem title={medicineID} subTitle={'Found'} image={imageURI}/>
        <View style={styles.container}>
            {/* <AppWideButton title={'Go to Prescription'}/> */}
            {add && <AppWideButton color={'primaryDark'} title={'Retry'} onPress={() => navigation.goBack()}/>}
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    resultImage: {
        overflow: "hidden",
        resizeMode: "contain",
        alignSelf: "center",
        width: "100%",
        height: "90%",
        //marginTop: 10,
    },
    screen: {
        flex: 1,
        backgroundColor: defaultStyles.colors.lightGray
    }
});

export default ResultScreen;