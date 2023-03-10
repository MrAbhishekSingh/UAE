import { View, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import image from '../assets/background1.jpg'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar, Box, Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GR from '../assets/ca.jpg'
let data = Array(100)
const List = () => {
    return (
     
            <>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
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
                            shadowColor: '#fff'
                        }}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{
                            height: '100%', borderRadius: 10, padding: 10, width: '100%',
                            justifyContent: 'center',
                        }}>
                            <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
                                <Avatar bg="green.500" alignSelf="center" size="md" source={GR}>
                                    AJ
                                </Avatar>
                                <Text color='#fff' fontWeight='700' fontSize='20' >USA</Text>
                                <MaterialCommunityIcons style={{ margin: 3 }} name="crown-outline" size={40} color="#fff" />
                                 <MaterialCommunityIcons style={{ margin: 3 }} name="signal" size={40} color="#22c55e" />
                            </Box>
                        </LinearGradient>
                    </TouchableOpacity>

                )}
                />
                </>
      
    )
}

export default List