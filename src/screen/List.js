import { TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Box, Text } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerButton from '../component/DrawerButton';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = ({ navigation }) => {
  const { user, userAllData } = useContext(AuthContext);
  const [data, setData] = useState([])
  const [userData, setUserData] = useState('');
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };
  const adUnitId = __DEV__
    ? 'ca-app-pub-5136668440114711/9841925955'
    : 'ca-app-pub-5136668440114711/9841925955';


  useEffect(() => {
    if (user) {
      getUser();
    }
  }, []);

  const ListGet = async () => {
   await AsyncStorage.getItem('list').then(item => {
              let data = JSON.parse(item)
              setData(data);
        })
  }

  useEffect(() => {
  ListGet()
  },[])
  


  const proplan = item => {
    if (user) {
      if (
        userAllData.plan_CreatedAt_end !== null &&
        userAllData.plan_CreatedAt_end !== ''
      ) {
        navigation.navigate('HomeMain', {
          item: item,
        });
      } else {
        navigation.navigate('Subscription');
      }
    } else {
      navigation.navigate('Subscription');
    }
  };

  const freeplan = item => {
    navigation.navigate('HomeMain', {
      item: item,
    });
  };

  return (
    <>
      <DrawerButton
        onPress={() => navigation.toggleDrawer()}
        onPress1={() => navigation.navigate('Subscription')}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              onPress={item.plan ? () => proplan(item) : () => freeplan(item)}
              key={index}
              style={{
                backgroundColor: '#7dd3fc',
                borderRadius: 10,
                margin: 10,
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
                height: 70,
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 10,
                shadowColor: '#fff',
              }}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{
                  height: '100%',
                  borderRadius: 10,
                  padding: 10,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Avatar
                    bg="green.500"
                    alignSelf="center"
                    size="md"
                    source={{
                      uri: item.flag
                    }}
                  >
                    AJ
                  </Avatar>
                  <Text width="35%" color="#fff" fontWeight="700" fontSize="20">
                    {item.name}
                  </Text>
                  {item.plan ? (
                    <MaterialCommunityIcons
                      style={{ margin: 3 }}
                      name="crown-outline"
                      size={40}
                      color={userAllData.plan_CreatedAt_end ? '#07e689' : '#fff'}
                    />
                  ) : (
                    <Text color="#07e689" fontWeight="700" fontSize="20">
                      FREE
                    </Text>
                  )}
                  <MaterialCommunityIcons
                    style={{ margin: 3 }}
                    name="signal"
                    size={40}
                    color="#22c55e"
                  />
                </Box>
              </LinearGradient>
            </TouchableOpacity>
            {user ?
              <>
                {userAllData?.plan_CreatedAt_end &&  Object.keys(userAllData?.plan_CreatedAt_end).length > 0
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
          </>
        )}
      />
    </>
  );
};

export default List;
