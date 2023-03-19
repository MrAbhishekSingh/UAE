import {View, Text} from 'react-native';
import React from 'react';
import DrawerButton from '../component/DrawerButton';
import {WebView} from 'react-native-webview';

const Speedtest = ({navigation}) => {
  return (
    <>
      <DrawerButton
        onPress={() => navigation.toggleDrawer()}
        onPress1={() => navigation.navigate('Subscription')}
      />
      <View style={{flex: 1}}>
        <Text>Speedtest</Text>
        <WebView source={{uri: 'https://www.speedtest.net/'}} />
      </View>
    </>
  );
};

export default Speedtest;
