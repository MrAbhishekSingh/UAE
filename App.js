
import { Alert, BackHandler, ImageBackground } from 'react-native';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import React from 'react';
import { NativeBaseProvider, Box, StatusBar, useSafeArea, Text, View } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AppStack from './src/navigation/Navigation';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/navigation/AuthProvider';
import axios from 'react-native-axios'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
console.warn = () => { }

const App = () => {
  const [connection, setConnection] = useState()
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      flex: 1,
    },
  };
  const getData = async () => {
    await axios.get('https://thefind.tech/api/hello')
      .then(async function (response) {
        await AsyncStorage.setItem('list', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state);
  });

  const netInfo = useNetInfo();
  console.log('netInfo',netInfo.isConnected);

  unsubscribe()
  

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <StatusBar hidden /> */}
        <NativeBaseProvider>
          <ImageBackground
            source={ netInfo.isConnected?.toString() === 'true' ? {  uri: 'https://i.pinimg.com/236x/65/61/06/6561067e34e3eb63135ec42397fabc45.jpg' } : null}
            resizeMode="cover"
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <NavigationContainer theme={MyTheme}>
              <AuthProvider>
                {netInfo.isConnected?.toString() === 'true' ?
                  <AppStack /> :
                <>
                 {/* { Alert.alert('Connection', 'No internet connection', [
                    { text: 'OK', onPress: () => BackHandler.exitApp()},
                  ])} */}
                  <View>
                    <Text color='#000' fontWeight="900" fontSize='20'>No Internet Connection</Text>
                  </View>
                </>}
              </AuthProvider>
            </NavigationContainer>
          </ImageBackground>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
