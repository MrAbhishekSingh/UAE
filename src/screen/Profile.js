import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import DrawerButton from '../component/DrawerButton';
import {Avatar, Box, Button, HStack, Text} from 'native-base';
import {AuthContext} from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Profile = ({navigation}) => {
  const {userAllData, user} = useContext(AuthContext);

  let name = userAllData.displayName.substring(0, 1);
  return (
    <>
      <HStack
        flex="1"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        direction="column"
        padding="2"
        mx={{
          base: 'auto',
          md: '0',
        }}
        space={2}>
        <DrawerButton
          onPress={() => navigation.toggleDrawer()}
          onPress1={() => navigation.navigate('Subscription')}
        />
        <Avatar
          size="2xl"
          bg="#edeceb"
          borderWidth="10"
          borderColor="#6ee1f0"
          _text={{color: 'black'}}
          mr="1"
          source={{
            uri: 'https://bit.ly/broken-link',
          }}>
          {name}
        </Avatar>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{borderRadius: 10, width: '100%'}}>
          <Box style={styles.upgrage1}>
            <Box>
              <Text
                textTransform="uppercase"
                color="light.50"
                fontWeight="600"
                textAlign="center"
                py="5"
                fontSize="35">
                -- : profile : --
              </Text>
              <Text
                textTransform="uppercase"
                color="light.50"
                fontWeight="900"
                textAlign="center"
                fontSize="15">
                Name : {userAllData.displayName}
                {'\n'}
                {'\n'}
                Email : {userAllData.email}
                {'\n'}
                {'\n'}
                Plan status : {userAllData.plan_status}
                {'\n'}
                {'\n'}
                Phone No. : {userAllData.phone}
                {'\n'}
                {'\n'}
                Country : {userAllData.country}
                {'\n'}
                {'\n'}
                Plan name : {userAllData.plan_Type}
              </Text>
            </Box>
            <Button
              onPress={() => Alert.alert('Please select plan')}
              mt="5"
              width="80%"
              _text={{
                fontSize: 20,
                textTransform: 'uppercase',
                fontWeight: '900',
              }}
              colorScheme="success">
              Upgrade your plan
            </Button>
          </Box>
        </LinearGradient>
      </HStack>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  upgrage1: {
    width: '100%',
    height: heightPercentageToDP('65%'),
    borderRadius: 15,
    backgroundColor: '#3b5998',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#7dd3fc',
    padding: 20,
  },
});
