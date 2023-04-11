import * as React from 'react';
import { Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
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
import SignUp from '../screen/SignUp/SignUp';
import Login from '../screen/Login/Login';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';

function CustomDrawerContent(props) {
  const {user, logout} = React.useContext(AuthContext);
  const onPress = () => {
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            logout();
          },
        },
      ],
      {cancelable: false},
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
    </Stack.Navigator>
  );
}

export default function AppStack() {
  const {user, setUser} = React.useContext(AuthContext);
  const [initializing, setInitializing] = React.useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <>
      {user ? (
        <>
          <Drawer.Navigator
            screenOptions={{headerShown: false}}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="HomeMain" component={Home} />
            <Drawer.Screen name="List" component={List} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Subscription" component={Subscription} />
          </Drawer.Navigator>
        </>
      ) : (
        <>
          <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="HomeMain" component={Home} />
            <Drawer.Screen name="List" component={List} />
            <Drawer.Screen name="Subscription" component={Subscription} />
            <Drawer.Screen name="SignUp" component={SignUp} />
            <Drawer.Screen name="Login" component={Login} />
          </Drawer.Navigator>
        </>
      )}
    </>
  );
}
