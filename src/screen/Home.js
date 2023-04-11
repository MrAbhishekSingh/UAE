import {
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  I18nManager,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import networkSpeed from 'react-native-network-speed';
import DrawerButton from '../component/DrawerButton';
import RNSimpleOpenvpn, {
  addVpnStateListener,
  removeVpnStateListener,
} from 'react-native-simple-openvpn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import {
  CharonErrorState,
  VpnState,
  connect,
  disconnect,
  getCharonErrorState,
  getCurrentState,
  onStateChangedListener,
  prepare,
} from 'react-native-vpn-ipsec';
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';

const isIPhone = Platform.OS === 'ios';

const Home = ({ route, navigation }) => {
  const { user, userAllData } = useContext(AuthContext);
  const [speed, setSpeed] = useState('');
  const [itemData, setItemData] = useState({});
  const [log, setLog] = useState('');
  const [status, _status] = useState(0);
  const isMounted = useRef(true);
  const [state, setState] = useState(VpnState[VpnState.disconnected]);
  const [charonState, setCharonState] = useState(
    CharonErrorState[CharonErrorState.NO_ERROR],
  );

  const adUnitId = __DEV__
    ? 'ca-app-pub-5136668440114711/9841925955'
    : 'ca-app-pub-5136668440114711/9841925955';

  useEffect(() => {
    prepare()
      .then(() => console.log('prepared'))
      .catch(err => {
        console.log(err);
      });
    onStateChangedListener(e => {
      SaveDtat(e.state);
      setState(VpnState[e.state]);
      setCharonState(CharonErrorState[e.charonState]);
    });
  }, []);

  useEffect(() => {
    Dataget()
  }, [route.params]);

  const Dataget = async () => {
    if (route.params) {
      const { item } = route.params;
      if (item) {
        await AsyncStorage.setItem('item', JSON.stringify(item));
        GetDtat()
      }
    }
  }
  const onSelectSwitch = async index => {
    try {
      if (Object.keys(itemData).length > 0) {
        connect({ name: 'Abhishek', type: 'ikev2', },
          itemData.address,
          itemData.username,
          itemData.password,
          '',
          false,
        ).then(data => {
          console.log('data', data);
        })
      } else {
        connect({ name: 'Abhishek', type: 'ikev2', },
          'lux-152-ike.whiskergalaxy.com',
          '64pjyv8h-d26sazf',
          'vkhgb869nj',
          '',
          false,
        ).then(data => {
          console.log('data', data);
        })

      }
    } catch (error) {
      updateLog(error);

    }
  };
  const offSelectSwitch = async index => {
    try {
      disconnect()
        .then(() => console.log('disconnect: '))
        .catch(console.log)
    } catch (error) {
      updateLog(error);
    }
  };

  useEffect(() => {
    networkSpeed.startListenNetworkSpeed(({ downLoadSpeed }) => {
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
    await AsyncStorage.getItem('item').then(item => {
      if (isMounted.current) {
        if (item != undefined && item != null) {
          if (Object.keys(item).length > 0) {
            if (isMounted.current) {
              let data = JSON.parse(item)
              setItemData(data);
            }
          }
        }
      } else {
        isMounted.current = true
      }

    });
  };

  useEffect(() => {
    GetDtat()
  }, [])


  return (
    <>
      <DrawerButton
        onPress={() => navigation.toggleDrawer()}
        onPress1={() => navigation.navigate('Subscription')}
      />
      <VStack justifyContent="center" alignItems="center" height="50%">
         {user ?
          <>
            {userAllData?.plan_CreatedAt_end && Object.keys(userAllData?.plan_CreatedAt_end).length > 0
              ?
              null
              :
              <Box style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.BANNER}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                />
              </Box>
            }
          </> :
          <Box style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </Box>
        }
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="35%">
          {status == 0 ? (
            <>
              <Icon
                style={{ margin: 3 }}
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
                style={{ margin: 3 }}
                name="angle-dobule-up"
                size={20}
                color="#22c55e"
              />
              <Text color="#fff" fontWeight="700" fontSize="20">
                connected
              </Text>
            </>
          )}
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
            width: '50%',
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 10,
            shadowColor: '#fff',
          }}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ borderRadius: 10, padding: 10, width: '100%' }}>
            <TouchableOpacity onPress={() => navigation.navigate('List')}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <Fontisto name="earth" size={20} color="#fff" />
                <Text color="#fff" fontWeight="700" fontSize="20">
                  {itemData.name ? itemData.name : 'Japan'}
                </Text>
                <Icon name="right" size={20} color="#fff" />
              </Box>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </VStack>
      {user ?
        <>
          {userAllData?.plan_CreatedAt_end && Object.keys(userAllData?.plan_CreatedAt_end).length > 0
            ?
            null
            :
            <Box style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </Box>
          }
        </> :
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </Box>
      }
      <LinearGradient
        colors={['transparent', '#0369a1', '#7dd3fc']}
        style={{ height: '40%', }}>
        <VStack
          shadow={5}
          height="80%"
          space={4}
          alignItems="center"
          justifyContent="center">
          <RNSlidingButton
            style={styles.container}
            height={80}
            onSlidingSuccess={status == 0 ? () => onSelectSwitch() : () => offSelectSwitch()}
            slideDirection={SlideDirection.RIGHT}>
            <View elevation={10} style={styles.basicStyle}>
              <Text numberOfLines={1} style={[styles.eahcStyles, { color: status == 0 ? '#34d399' : '#eb4034' }]}>
                {status == 0 ? 'connect' : 'disconnect'}<Icon
                  name="doubleright"
                  size={15}
                  color={status == 0 ? '#34d399' : '#eb4034'}
                />
              </Text>
            </View>
          </RNSlidingButton>
          {user ?
            <>
              {userAllData?.plan_CreatedAt_end && Object.keys(userAllData?.plan_CreatedAt_end).length > 0
                ?
                null
                :
                <Box style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.BANNER}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: true,
                    }}
                  />
                </Box>
              }
            </> :
            <Box style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </Box>
          }
        </VStack>

      </LinearGradient>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4c669f',
    borderRadius: 20,
    width: '80%',
    borderWidth: 5,
    borderColor: '#7dd3fc',
    paddingLeft: 5,
    shadowColor: '#fff',
    elevation: 10,
  },
  basicStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 150,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  eahcStyles: {
    fontSize: 17,
    fontWeight: '700',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  eahcStylesOf: {
    fontSize: 14,
    color: 'green',
    position: 'absolute',
    top: 20,
    right: 5,
    transform: [{ rotate: '270deg' }],
    fontWeight: '700',
  },
  mainStyes: {
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
  },
});



