import { View, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import image from '../assets/background1.jpg'
import { Avatar, Box, Button, Stack, Switch, Text, VStack } from 'native-base'
import { G, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSwitch from '../component/CustomSwitch';
import LinearGradient from 'react-native-linear-gradient';
import networkSpeed from 'react-native-network-speed';
import img from '../assets/water.gif'
import earth from '../assets/earth.gif'

const Home = () => {
  const [speed , setSpeed]=useState('')
  
  const onSelectSwitch = index => {
    networkSpeed.startListenNetworkSpeed(({ downLoadSpeed, downLoadSpeedCurrent, upLoadSpeed, upLoadSpeedCurrent }) => {
      setSpeed(downLoadSpeed)
    })
    // networkSpeed.stopListenNetworkSpeed()
  };
  useEffect(() => {
    console.log(speed)
  }, [speed])
  
  
  console.log('asfasfsafasf',speed)
  return (
  <>
      <Stack direction={{
        base: "row",
        md: "row"
      }} width='100%' justifyContent='space-between' alignItems='center' p='2' space={4}>
        <TouchableOpacity
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
            shadowColor: '#fff'
          }}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 10 }}>
            <Icon name="bars" size={40} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <Text color='#fff' fontWeight='700' fontSize="xl" >
          demo
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#7dd3fc',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2
          }}
        >
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 10 }}>
            <MaterialCommunityIcons style={{ margin: 3 }} name="crown-outline" size={40} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </Stack >
      <VStack justifyContent='center' alignItems='center' height='40%'>
        <Box flexDirection='row' justifyContent='space-between' alignItems='center' width='33%' >
          <Fontisto style={{ margin: 3 }} name="angle-dobule-up" size={20} color="#22c55e" />
          <Text color='#fff' fontWeight='700' fontSize='20'>
            Download</Text>
        </Box>
        <Text color='#fff' fontWeight='900' fontSize='70'>{speed ? (speed / 1000).toFixed(2) : 0}</Text>
        <Text bottom='5' color='#fff' fontWeight='700' fontSize='20'>mb/s</Text>
        <TouchableOpacity
          onPress={onSelectSwitch}
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
            shadowColor: '#fff'
          }}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ borderRadius: 10, padding: 10, width: '100%', }}>
            <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
              <Fontisto name="earth" size={20} color="#fff" />
              <Text color='#fff' fontWeight='700' fontSize='20' >USA</Text>
              <Icon name="right" size={20} color="#fff" />
            </Box>
          </LinearGradient>
        </TouchableOpacity>

      </VStack>
      <LinearGradient colors={['transparent', '#0369a1', '#7dd3fc']} style={{ height: '40%' }}>
        <VStack height='80%' space={4} alignItems="center" justifyContent='center'>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={'First'}
            option2={'Second'}
          // onSelectSwitch={onSelectSwitch}
          />
        </VStack>
      </LinearGradient>
  </>
  )
}

export default Home