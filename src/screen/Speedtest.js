import { View, Text } from 'react-native'
import React from 'react'
import DrawerButton from '../component/DrawerButton'

const Speedtest = ({navigation}) => {
  return (
    <>
   <DrawerButton onPress={() => navigation.toggleDrawer()} onPress1={() => navigation.navigate('Subscription')}/>
    <View>
      <Text>Speedtest</Text>
    </View>
    </>
  )
}

export default Speedtest