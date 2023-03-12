import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screen/Home';
import List from '../screen/List';
import Profile from '../screen/Profile';
import Subscription from '../screen/Subscription';
import Speedtest from '../screen/Speedtest';
import SignUp from '../screen/SignUp/SignUp';
import Login from '../screen/Login/Login';

function CustomDrawerContent(props) {
  // const {user, logout} = useContext(AuthContext);
  const onPress = () => {
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      // [
      //   {
      //     text: 'Cancel',
      //     onPress: () => {
      //       return null;
      //     },
      //   },
      //   {
      //     text: 'Confirm',
      //     onPress: () => {
      //       logout();
      //     },
      //   },
      // ],
      // {cancelable: false},
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={onPress} />
    </DrawerContentScrollView>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNav({route, navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Speedtest" component={Speedtest} />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={StackNav} />
        <Drawer.Screen name="List" component={List} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Subscription" component={Subscription} />
        <Drawer.Screen name="Speedtest" component={Speedtest} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </>
  );
}
