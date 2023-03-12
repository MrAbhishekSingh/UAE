import {View, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import image from '../assets/background1.jpg';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Box, Text} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GR from '../assets/ca.jpg';
import DrawerButton from '../component/DrawerButton';
import {Data} from '../modal/Data';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const List = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, []);

  const proplan = item => {
    if (user) {
      if (userData.plan_status) {
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
        data={Data}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={item.plan ?(()=> proplan(item)) :(()=> freeplan(item))}
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
                  source={item.flag}>
                  AJ
                </Avatar>
                <Text width="25%" color="#fff" fontWeight="700" fontSize="20">
                  {item.name}
                </Text>
                {item.plan ? (
                  <MaterialCommunityIcons
                    style={{margin: 3}}
                    name="crown-outline"
                    size={40}
                    color="#fff"
                  />
                ) : (
                  <Text color="#07e689" fontWeight="700" fontSize="20">
                    FREE
                  </Text>
                )}
                <MaterialCommunityIcons
                  style={{margin: 3}}
                  name="signal"
                  size={40}
                  color="#22c55e"
                />
              </Box>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default List;
