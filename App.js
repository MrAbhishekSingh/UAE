// import React, { useEffect, useRef, useState } from "react";
// import { Alert, Modal, StyleSheet, Platform, Text, Pressable, View, ImageBackground, Image, ActivityIndicator } from "react-native";
// import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';
// import image from './src/assets/background.jpg'
// import JP from './src/assets/japan.png'
// import GR from './src/assets/ca.jpg'
// import RS from './src/assets/usa.png'
// import { NetworkInfo } from 'react-native-network-info';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';

// const isIPhone = Platform.OS === 'ios';
// const Data = [
//   {
//     id: 1,
//     name: 'Japan',
//     flag: JP,
//   },
//   {
//     id: 2,
//     name: 'Canada',
//     flag: GR,
//   },
//   {
//     id: 3,
//     name: 'Usa',
//     flag: RS,
//   },
// ]

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [log, setLog] = useState('');
//   const logScrollView = useRef(null);
//   const [status, _status] = useState(0)

//   const adUnitId = __DEV__
//     ? TestIds.BANNER
//     : 'ca-app-pub-5136668440114711/9841925955';

//   const adUnitIdd = __DEV__ ? TestIds.INTERSTITIAL :
//     'ca-app-pub-5136668440114711/7116562400'

//   useEffect(() => {
//     async function observeVpn() {
//       if (isIPhone) {
//         await RNSimpleOpenvpn.observeState();
//       }

//       addVpnStateListener((e) => {
//         updateLog(JSON.stringify(e))
//         SaveDtat((e.state));
//         GetDtat();
//       });
//     }

//     observeVpn();

//     return async () => {
//       if (isIPhone) {
//         await RNSimpleOpenvpn.stopObserveState();
//       }

//       removeVpnStateListener();
//     };
//   });

//   async function Handler(value) {
//     try {
//       await RNSimpleOpenvpn.connect({
//         remoteAddress: '',
//         ovpnFileName: value,
//         assetsPath: '',
//         notificationTitle: 'Uae Vpn',
//         compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_THREE_PEER,
//         providerBundleIdentifier: 'com.your.network.extension.bundle.id',
//         localizedDescription: 'TestRNSimpleOvpn',
//       });
//     } catch (error) {
//       updateLog(error);
//     }
//   }

//   async function stopOvpn() {
//     try {
//       await RNSimpleOpenvpn.disconnect();
//     } catch (error) {
//       updateLog(error);
//     }
//   }

//   function printVpnState() {
//     updateLog(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
//   }

//   function updateLog(newLog) {
//     const now = new Date().toLocaleTimeString();
//     setLog(`${log}${newLog}`);
//   }

//   const SaveDtat = async (value) => {
//     await AsyncStorage.setItem('name', `${value}`);
//   }
//   const GetDtat = async () => {
//     await AsyncStorage.getItem('name').then((name) => {
//       if (name) {
//         _status(name);
//       }
//     });
//   }

//   useEffect(() => {
//     GetDtat();
//   }, [])

//   useEffect(() => {
//     let interstitial = InterstitialAd.createForAdRequest(adUnitIdd, {
//       requestNonPersonalizedAdsOnly: true,
//       keywords: ['fashion', 'clothing'],
//     });
//     interstitial.addAdEventListener(AdEventType.LOADED, () => {
//       interstitial.show();
//     });
//     interstitial.load();
//     return () => {
//       interstitialListener = null;
//     };
//   }, []);
//   useEffect(() => {
//     if (status === '2') {
//       let interstitial = InterstitialAd.createForAdRequest(adUnitIdd, {
//         requestNonPersonalizedAdsOnly: true,
//         keywords: ['fashion', 'clothing'],
//       });
//       interstitial.addAdEventListener(AdEventType.LOADED, () => {
//         interstitial.show();
//       });
//       interstitial.load();
//       return () => {
//         interstitialListener = null;
//       }
//     }
//     if (status === '0') {
//       let interstitial = InterstitialAd.createForAdRequest(adUnitIdd, {
//         requestNonPersonalizedAdsOnly: true,
//         keywords: ['fashion', 'clothing'],
//       });
//       interstitial.addAdEventListener(AdEventType.LOADED, () => {
//         interstitial.show();
//       });
//       interstitial.load();
//       return () => {
//         interstitialListener = null;
//       }
//     }
//   }, [status]);

//   const textstyle = {
//     fontSize: 40,
//     color: "#fff",
//     fontWeight: "bold",
//     alignSelf: "center",
//     textTransform: "uppercase",
//     marginBottom: 100,
//     textShadowColor: '#009688',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 10
//   }

//   return (
//     <ImageBackground source={image} resizeMode="cover" style={styles.image}>
//       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//         <BannerAd
//           unitId={adUnitId}
//           size={BannerAdSize.BANNER}
//           requestOptions={{
//             requestNonPersonalizedAdsOnly: true,
//           }}
//         />
//       </View>
//       <View style={styles.centeredView}>
//         <View>
//           <Text style={styles.textStyle1}>{status == 0 ? 'disconnected' : status == 1 ? <>
//             <View>
//               <ActivityIndicator size="large" color="#00ff00" />
//               <Text style={styles.textStyle1}>connecting</Text>
//             </View>
//           </> : 'connected'}</Text>
//         </View>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             // Alert.alert("Modal has been closed.");
//             setModalVisible(!modalVisible);
//           }}
//         >
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               {Data.map((item, index) => (
//                 <View style={{ width: "100%", alignItems: 'center' }} key={index}>
//                   <View style={styles.contain}>
//                     <Pressable
//                       style={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         justifyContent: 'space-around',
//                         alignItems: 'center',

//                       }}
//                       onPress={() => {
//                         Handler(`${item.name}`),
//                           setModalVisible(false)
//                       }
//                       }
//                     >
//                       <Image
//                         style={{
//                           height: 25,
//                           width: 50,
//                           borderRadius: 3,
//                         }}
//                         source={item.flag}
//                       />
//                       <Text style={{
//                         fontSize: 18,
//                         color: "#fff",
//                         fontWeight: "bold",
//                         alignSelf: "center",
//                         textTransform: "uppercase"

//                       }}>{item.name}</Text>
//                     </Pressable>

//                   </View>
//                   <View>
//                     <BannerAd
//                       unitId={adUnitId}
//                       size={BannerAdSize.BANNER}
//                       requestOptions={{
//                         requestNonPersonalizedAdsOnly: true,
//                       }}
//                     />
//                   </View>
//                 </View>
//               ))}

//             </View>
//           </View>
//         </Modal>
//         {status == 0 ?
//           <Pressable
//             style={[styles.button, styles.buttonOpen]}
//             onPress={() => setModalVisible(true)}
//           >
//             <Text style={styles.textStyle}>Connect</Text>
//           </Pressable> : status == 2 ?
//             <Pressable
//               style={[styles.button, styles.buttonOpen]}
//               onPress={stopOvpn}
//             >
//               <Text style={styles.textStyle}>Disconnect</Text>
//             </Pressable> :
//             <Pressable
//               style={[styles.button, styles.buttonOpen]}
//               onPress={stopOvpn}
//             >
//               <Text style={styles.textStyle}>Reset</Text>
//             </Pressable>}
//       </View>
//       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//         <BannerAd
//           unitId={adUnitId}
//           size={BannerAdSize.BANNER}
//           requestOptions={{
//             requestNonPersonalizedAdsOnly: true,
//           }}
//         />
//       </View>
//     </ImageBackground>

//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   contain: {
//     justifyContent: 'center',
//     width: '100%',
//     height: 50,
//     marginVertical: 20,
//     elevation: 8,
//     backgroundColor: "#009688",
//     borderRadius: 50
//   },
//   modalView: {
//     width: '100%',
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowColor: 'black',
//     shadowOpacity: 0.8,
//     elevation: 10,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 10
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//     paddingHorizontal: 20,
//     fontSize: 15,
//   },
//   textStyle1: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//     paddingHorizontal: 20,
//     fontSize: 25,
//     fontWeight: '900',
//     textTransform: 'uppercase',
//     marginBottom: 20
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });

// export default App;
import { ImageBackground} from 'react-native';
import React from 'react';
import {NativeBaseProvider, Box, StatusBar} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import AppStack from './src/navigation/Navigation';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/navigation/AuthProvider';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      flex: 1,
    },
  };
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <StatusBar hidden /> */}
        <NativeBaseProvider>
          <ImageBackground
            source={{uri:'https://i.pinimg.com/236x/65/61/06/6561067e34e3eb63135ec42397fabc45.jpg'}}
            resizeMode="cover"
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <NavigationContainer theme={MyTheme}>
              <AuthProvider>
                <AppStack />
              </AuthProvider>
            </NavigationContainer>
          </ImageBackground>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
