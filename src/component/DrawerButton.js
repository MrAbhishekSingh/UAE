import {View, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Stack, Switch, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


const DrawerButton = (props) => {
  return (
    <Stack
    height="10%"
    direction={{
      base: 'row',
      md: 'row',
    }}
    width="100%"
    justifyContent="space-between"
    alignItems="center"
    p="2"
    space={4}>
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: '#7dd3fc',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,
        shadowColor: '#fff',
      }}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{borderRadius: 10}}>
        <Icon name="bars" size={40} color="#fff" />
      </LinearGradient>
    </TouchableOpacity>
    <Text color="#fff" fontWeight="700" fontSize="xl">
      UAE VPN
    </Text>
    <TouchableOpacity
      onPress={props.onPress1}
      style={{
        backgroundColor: '#7dd3fc',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{borderRadius: 10}}>
        <MaterialCommunityIcons
          style={{margin: 3}}
          name="crown-outline"
          size={40}
          color="#fff"
        />
      </LinearGradient>
    </TouchableOpacity>
  </Stack>
  )
}

export default DrawerButton