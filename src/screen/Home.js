import {
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import image from '../assets/background1.jpg';
import {Avatar, Box, Button, Stack, Switch, Text, VStack} from 'native-base';
import {G, Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSwitch from '../component/CustomSwitch';
import LinearGradient from 'react-native-linear-gradient';
import networkSpeed from 'react-native-network-speed';
import img from '../assets/water.gif';
import earth from '../assets/earth.gif';
import DrawerButton from '../component/DrawerButton';
import RNSimpleOpenvpn, {
  addVpnStateListener,
  removeVpnStateListener,
} from 'react-native-simple-openvpn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isIPhone = Platform.OS === 'ios';

const Home = ({route, navigation}) => {
  // const {item} = route.params;
  const [speed, setSpeed] = useState('');
  const [itemData, setItemData] = useState('');
  const [log, setLog] = useState('');
  const logScrollView = useRef(null);
  const [status, _status] = useState(0);
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    if (route.params) {
      const {item} = route.params;
      if (item) {
        setItemData(item);
        console.log('item', item);
      }
    }
  }, [route.params]);
  const onSelectSwitch = async index => {
    if (index === 0) {
      try {
        await RNSimpleOpenvpn.disconnect();
      } catch (error) {
        updateLog(error);
      }
    }
    if (index === 1) {
      try {
        await RNSimpleOpenvpn.connect({
          remoteAddress: '',
          ovpnFileName: itemData.name,
          assetsPath: '',
          notificationTitle: 'Uae Vpn',
          compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_THREE_PEER,
          providerBundleIdentifier: 'com.your.network.extension.bundle.id',
          localizedDescription: 'go with uae vpn',
        });
      } catch (error) {
        updateLog(error);
      }
    }
  };

  useEffect(() => {
    networkSpeed.startListenNetworkSpeed(({downLoadSpeed}) => {
      setSpeed(downLoadSpeed);
    });
  }, []);

  useEffect(() => {
    async function observeVpn() {
      if (isIPhone) {
        await RNSimpleOpenvpn.observeState();
      }

      addVpnStateListener(e => {
        updateLog(JSON.stringify(e));
        SaveDtat(e.state);
        GetDtat();
      });
    }

    observeVpn();

    return async () => {
      if (isIPhone) {
        await RNSimpleOpenvpn.stopObserveState();
      }

      removeVpnStateListener();
    };
  });

  // async function Handler(value) {
  //   try {
  //     await RNSimpleOpenvpn.connect({
  //       remoteAddress: '',
  //       ovpnFileName: 'Japan',
  //       assetsPath: '',
  //       notificationTitle: 'Uae Vpn',
  //       compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_THREE_PEER,
  //       providerBundleIdentifier: 'com.your.network.extension.bundle.id',
  //       localizedDescription: 'go with uae vpn',
  //     });
  //   } catch (error) {
  //     updateLog(error);
  //   }
  // }

  function printVpnState() {
    updateLog(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
  }

  function updateLog(newLog) {
    const now = new Date().toLocaleTimeString();
    setLog(`${log}${newLog}`);
  }

  const SaveDtat = async value => {
    await AsyncStorage.setItem('name', `${value}`);
  };
  const GetDtat = async () => {
    await AsyncStorage.getItem('name').then(name => {
      if (name) {
        _status(name);
      }
    });
  };

  const disConnect = async () => {
    await RNSimpleOpenvpn.disconnect();
  };
  useEffect(() => {
    setCurrent(false);
    if (itemData) {
      disConnect();
      setCurrent(true);
    }
  }, [itemData]);

  return (
    <>
      <DrawerButton
        onPress={() => navigation.toggleDrawer()}
        onPress1={() => navigation.navigate('Subscription')}
      />
      <VStack justifyContent="center" alignItems="center" height="50%">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="35%">
          {status == 0 ? (
            <>
              <Icon
                style={{margin: 3}}
                name="disconnect"
                size={20}
                color="#22c55e"
              />
              <Text color="#fff" fontWeight="700" fontSize="20">
                Disconnected
              </Text>
            </>
          ) : status == 1 ? (
            <>
              <ActivityIndicator size="large" color="#00ff00" />
              <Text color="#fff" fontWeight="700" fontSize="20">
                Connecting
              </Text>
            </>
          ) : (
            <>
              <Fontisto
                style={{margin: 3}}
                name="angle-dobule-up"
                size={20}
                color="#22c55e"
              />
              <Text color="#fff" fontWeight="700" fontSize="20">
                Download
              </Text>
            </>
          )}
          {/* <Fontisto
            style={{margin: 3}}
            name="angle-dobule-up"
            size={20}
            color="#22c55e"
          />
          <Text color="#fff" fontWeight="700" fontSize="20">
            Download
          </Text> */}
        </Box>
        <Text color="#fff" fontWeight="900" fontSize="70">
          {speed ? (speed / 1000).toFixed(2) : 0}
        </Text>
        <Text bottom="5" color="#fff" fontWeight="700" fontSize="20">
          mb/s
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#7dd3fc',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            shadowColor: '#fff',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            width: '40%',
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
            shadowColor: '#fff',
          }}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{borderRadius: 10, padding: 10, width: '100%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('List')}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Fontisto name="earth" size={20} color="#fff" />
                <Text color="#fff" fontWeight="700" fontSize="20">
                  {itemData.name}
                </Text>
                <Icon name="right" size={20} color="#fff" />
              </Box>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </VStack>
      <LinearGradient
        colors={['transparent', '#0369a1', '#7dd3fc']}
        style={{height: '40%'}}>
        <VStack
          height="80%"
          space={4}
          alignItems="center"
          justifyContent="center">
          <CustomSwitch
            current={current}
            selectionMode={1}
            roundCorner={true}
            option1={'First'}
            option2={'Second'}
            onSelectSwitch={onSelectSwitch}
          />
        </VStack>
      </LinearGradient>
    </>
  );
};

export default Home;
