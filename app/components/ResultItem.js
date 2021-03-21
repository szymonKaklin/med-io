import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';

// Found pill and prescription
// function ResultItem({title, subTitle, image}) {
//   return (
//     <View style={styles.container}>
//         {image && <Image style={styles.image} source={image} />}
//         <View style={styles.verticalSplit}>
//             <View style={styles.icon}>
//                 <MaterialCommunityIcons name="check" color={'darkgreen'} size={70} />
//                 <AppText
//                     style={styles.title, 
//                         {fontSize: title.length < 9 ? 50 : 50*(8.8/title.length)}}
//                 >
//                     {title}
//                 </AppText>
//             </View>
//         </View>
//         <View style={styles.textContent}>
//             <AppText style={styles.text}>This medicine in this picture has been identified and found in your prescriptions</AppText>
//         </View>
//     </View>
//   );
// }

// found but not in prescriptions
// function ResultItem({title, subTitle, image}) {
//     return (
//       <View style={styles.container}>
//           {image && <Image style={styles.image} source={image} />}
//           <View style={styles.verticalSplit}>
//               <View style={styles.icon}>
//                   <MaterialCommunityIcons name="magnify-plus" color={'black'} size={70} />
//                   <AppText
//                       style={styles.title, 
//                           {fontSize: title.length < 9 ? 50 : 50*(8.8/title.length)}}
//                   >
//                       {title}
//                   </AppText>
//               </View>
//           </View>
//           <View style={styles.textContent}>
//               <AppText style={styles.text}>The medicine in this picture has been identified but isn't in your prescriptions </AppText>
//           </View>
//       </View>
//     );
//   }

// not identified
function ResultItem({title, subTitle, image}) {
    return (
      <View style={styles.container}>
          {image && <Image style={styles.image} source={{ uri: image}} />}
          <View style={styles.verticalSplit}>
              <View style={styles.icon}>
                  <MaterialCommunityIcons name="close" color={'red'} size={70} />
                  <AppText
                      style={styles.title, 
                          {fontSize: title.length < 9 ? 50 : 50*(8.8/title.length)}}
                  >
                      {title}
                  </AppText>
              </View>
          </View>
          <View style={styles.textContent}>
              <AppText style={styles.text}>No medicine could be identified in this picture. Please try again.</AppText>
          </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
      height: 270,
      //alignItems: "center",
      //padding: 15,
      backgroundColor: defaultStyles.colors.primaryLight,
  },
  icon: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
  },
  image: {
      //alignSelf: "center",
      width: "100%",
      height: 200,
  },
  subTitle: {
      color: defaultStyles.colors.secondary,
      fontWeight: "bold", 
  },
  textContent: {
      padding: 5,
  },
  text: {
      textAlign: 'center',
      fontSize: 25,
  },
  verticalSplit: {
      flexDirection: 'row',
  },
});

export default ResultItem;