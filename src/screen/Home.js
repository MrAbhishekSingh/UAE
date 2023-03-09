import { View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import image from '../assets/background1.jpg'
import { Box, Button, Stack, Switch, Text, VStack } from 'native-base'
import { G, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomSwitch from '../component/CustomSwitch';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const onSelectSwitch = index => {
    // alert('Selected index: ' + index);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={{
      flex: 1,
      padding: 5,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Stack direction={{
        base: "row",
        md: "row"
      }} width='100%' justifyContent='space-between' alignItems='center' py='2' space={4}>
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
            shadowColor:'#fff'
          }}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{borderRadius:10}}>
            <Icon name="bars" size={40} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <Text color='#fff' fontWeight='700' fontSize="xl">
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
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{borderRadius:10}}>
            <Icon style={{margin:3}} name="earth" size={40} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </Stack >
      <VStack space={4} borderWidth='2' height='40%'>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Text color='#fff'>fsdfsdf</Text>
        </TouchableOpacity>
      </VStack>
      <LinearGradient colors={['transparent', '#0369a1', '#7dd3fc']} style={{ height: '40%' }}>
        <VStack height='80%' space={4} alignItems="center" justifyContent='center'>
          <CustomSwitch
            selectionMode={1}
            roundCorner={true}
            option1={'First'}
            option2={'Second'}
            onSelectSwitch={onSelectSwitch}
          />
        </VStack>
      </LinearGradient>
    </ImageBackground>
  )
}

export default Home