// import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import DrawerButton from '../component/DrawerButton';

// const Subscription = ({navigation}) => {
//   return (
//     <>
//       <DrawerButton
//         onPress={() => navigation.toggleDrawer()}
//         onPress1={() => navigation.navigate('Subscription')}
//       />
//       <View style={{flex: 1}}>
//         {/* <Image style={styles.image} source={require('../assets/as.png')} /> */}
//         <Text style={styles.heading}>UAE VPN PLAN</Text>
//         <Text style={styles.description}>
//           an publishing and graphic design, Lorem ipsum is a placeholder text
//           commonly used to demonstrate
//         </Text>
//         {/* <OfferDetail title='60% Off on our partner shops' />
//             <OfferDetail title='10 Free scope icre-creams' />
//             <OfferDetail title='New coupon everyday' />
//             <OfferDetail title='New coupon everyday' /> */}
//         <Text style={styles.footerText}>Choose a plan</Text>
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.planBox}>
//             <Text style={styles.boxTitle}>Monthly</Text>
//             <Text style={styles.boxPrice1}>$9.99</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.planBox}>
//             <Text style={styles.boxTitle}>Yearly</Text>
//             <Text style={styles.boxDicount}>$120.00</Text>
//             <Text style={styles.boxPrice2}>$95.99</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// };

// export default Subscription;

// const styles = StyleSheet.create({
//   linearGradient: {
//     flex: 1,
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderRadius: 5,
//   },
//   title: {
//     alignSelf: 'center',
//     marginTop: 50,
//     color: 'white',
//     fontFamily: 'AvertaStd-Bold',
//     fontSize: 28,
//   },
//   heading: {
//     alignSelf: 'center',
//     marginTop: 20,
//     fontFamily: 'AvertaStd-Bold',
//     fontSize: 35,
//     color: 'white',
//   },
//   description: {
//     margin: 15,
//     textAlign: 'center',
//     marginTop: 15,
//     fontFamily: 'AvertaStd-Regular',
//     fontSize: 15,
//     lineHeight: 25,
//     color: 'white',
//   },
//   image: {
//     alignSelf: 'center',
//     width: 90,
//     height: 71,
//     marginTop: 30,
//   },
//   footerText: {
//     alignSelf: 'center',
//     marginTop: 25,
//     fontFamily: 'AvertaStd-Bold',
//     fontSize: 28,
//     color: 'white',
//   },
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     marginTop: 20,
//   },
//   planBox: {
//     height: 150,
//     width: '45%',
//     borderRadius: 15,
//     backgroundColor: 'white',
//     opacity: 0.5,
//   },
//   boxTitle: {
//     alignSelf: 'center',
//     marginTop: 20,
//     fontSize: 18,
//     fontFamily: 'AvertaStd-Bold',
//     color: '#070923',
//   },
//   boxPrice1: {
//     alignSelf: 'center',
//     marginTop: 50,
//     fontSize: 30,
//     fontFamily: 'AvertaStd-ExtraBold',
//     color: '#070923',
//   },
//   boxPrice2: {
//     alignSelf: 'center',
//     marginTop: 15,
//     fontSize: 30,
//     fontFamily: 'AvertaStd-ExtraBold',
//     color: '#070923',
//   },
//   boxDicount: {
//     alignSelf: 'center',
//     marginTop: 15,
//     fontSize: 18,
//     fontFamily: 'AvertaStd-Bold',
//     color: '#070923',
//     opacity: 0.5,
//     textDecorationLine: 'line-through',
//   },
// });

import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Divider, Text, VStack} from 'native-base';
import DrawerButton from '../component/DrawerButton';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import RazorpayCheckout from 'react-native-razorpay';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Subscription = ({navigation}) => {
  const [select, setSelect] = useState();
  const [yearPlan, setYearPlan] = useState();
  const [monthPlan, setMonthPlan] = useState();
  const {userAllData, user} = useContext(AuthContext);

  const paymentHandler = () => {
    if (select === 1) {
      var options = {
        description: 'UAE VPN',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_DlIpJ3nkoh4NWt',
        amount: `${12 * 8000}`,
        name: 'Acme Corp',
        prefill: {
          email: userAllData.email,
          contact: userAllData.phone,
          name: userAllData.displayName,
        },
        theme: {color: '#53a20e'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          setYearPlan(`${data.razorpay_payment_id}`);
          console.log(`${data.razorpay_payment_id}`);
        })
        .catch(error => {
          console.log(`Error: ${error.code} | ${error.description}`);
        });
    }
    if (select === 2) {
      var options = {
        description: 'UAE VPN',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_DlIpJ3nkoh4NWt',
        amount: `${1.5 * 8000}`,
        name: 'Acme Corp',
        prefill: {
          email: userAllData.email,
          contact: userAllData.phone,
          name: userAllData.displayName,
        },
        theme: {color: '#53a20e'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          setMonthPlan(`${data.razorpay_payment_id}`);
          console.log(`${data.razorpay_payment_id}`);
        })
        .catch(error => {
          console.log(`Error: ${error.code} | ${error.description}`);
        });
    }
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const forYear = new Date(year + 1, month, day); // PLUS 1 YEAR
  const forMonth = new Date(year, month + 1, day); // PLUS 1 MONTH
  const f = new Date(year, month, day + 1); // PLUS 1 DAY

  const handleUpdate = async plandata => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        plan_CreatedAt_start: date,
        plan_CreatedAt_end: forMonth,
        plan_Type: 'monthly',
        plan_status: 'active',
        plan_details_id: plandata,
      })
      .then(() => {
        Alert.alert('congratulation! your monthly plan active');
      });
  };
  useEffect(() => {
    if (monthPlan !== '' && monthPlan !== undefined) {
      handleUpdate(monthPlan);
    }
  }, [monthPlan]);

  const handleUpdateYear = async plandatayear => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        plan_CreatedAt_start: date,
        plan_CreatedAt_end: forYear,
        plan_Type: 'yearly',
        plan_status: 'active',
        plan_details_id: plandatayear,
      })
      .then(() => {
        Alert.alert('congratulation! your yearly plan active');
      });
  };
  useEffect(() => {
    if (yearPlan !== '' && yearPlan !== undefined) {
      handleUpdateYear(yearPlan);
    }
  }, [yearPlan]);
  const getDate = data => {
    const output = new Date(data.plan_CreatedAt_start.seconds * 1000);
    startDate = output.toISOString().substring(0, 10);
    const output1 = new Date(data.plan_CreatedAt_end.seconds * 1000);
    expireDate = output1.toISOString().substring(0, 10);

    return `Start Date : ${startDate}  \n  Expire Date : ${expireDate}`;
  };

  return (
    <>
      <DrawerButton
        onPress={() => navigation.toggleDrawer()}
        onPress1={() => navigation.navigate('Subscription')}
      />
      <Box border="1" borderRadius="md">
        <VStack px="2" space="4">
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{borderRadius: 10}}>
            <Box style={styles.upgrage}>
              {true ? (
                <>
                  <Text
                    textTransform="uppercase"
                    color="light.50"
                    fontWeight="900"
                    fontSize="35">
                    {userAllData.plan_Type
                      ? userAllData.plan_Type
                      : 'FREE PLAN'}
                  </Text>
                  <Text
                    textTransform="uppercase"
                    color="light.50"
                    fontWeight="400"
                    textAlign="center"
                    fontSize="15">
                    {userAllData.plan_CreatedAt_start
                      ? getDate(userAllData)
                      : 'please upgrade your plan'}
                  </Text>
                </>
              ) : (
                <>
                  <Text color="light.50" fontWeight="900" fontSize="35">
                    FREE PLAN
                  </Text>
                  <Text color="light.50" fontWeight="900" fontSize="30">
                    $1.50
                  </Text>
                  <Text color="light.50" fontWeight="600" fontSize="15">
                    month only
                  </Text>
                </>
              )}
            </Box>
          </LinearGradient>

          <Box flexDir="row" justifyContent="space-between" pt="4" style>
            <TouchableOpacity
              onPress={() => setSelect(1)}
              style={select == 1 ? styles.planBox1 : styles.planBox}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Text color="light.50" fontWeight="900" fontSize="35">
                  Yearly
                </Text>
                <Text color="light.50" fontWeight="900" fontSize="30">
                  $12.00
                </Text>
                <Text color="light.50" fontWeight="600" fontSize="15">
                  $1/month
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelect(2)}
              style={select == 2 ? styles.planBox1 : styles.planBox}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Text color="light.50" fontWeight="900" fontSize="35">
                  Monthly
                </Text>
                <Text color="light.50" fontWeight="900" fontSize="30">
                  $1.50
                </Text>
                <Text color="light.50" fontWeight="600" fontSize="15">
                  month only
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Box>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{borderRadius: 10}}>
            <Box style={styles.upgrage1}>
              <Text
                textTransform="uppercase"
                color="light.50"
                fontWeight="600"
                fontSize="25">
                benefits
              </Text>
              <Text
                textTransform="uppercase"
                color="light.50"
                fontWeight="400"
                textAlign="center"
                fontSize="15">
                Boost your speed
                {'\n'}
                Improve network
                {'\n'}
                Improve ping
                {'\n'}
                Ads free
              </Text>
              <Button
                onPress={
                  user
                    ? select
                      ? paymentHandler
                      : () => Alert.alert('Please select plan')
                    : () => navigation.navigate('Login')
                }
                mt="5"
                width="80%"
                colorScheme="success">
                Pay amount
              </Button>
            </Box>
          </LinearGradient>
        </VStack>
      </Box>
    </>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  planBox: {
    height: 150,
    width: '45%',
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#7dd3fc',
  },
  planBox1: {
    height: 150,
    width: '45%',
    borderRadius: 15,
    // backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#22c55e',
    overflow: 'hidden',
  },
  upgrage: {
    height: 150,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#3b5998',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#7dd3fc',
  },
  upgrage1: {
    width: '100%',
    height: heightPercentageToDP('35%'),
    borderRadius: 15,
    backgroundColor: '#3b5998',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#7dd3fc',
  },
});
