import { View, } from 'react-native'
import React from 'react'
import { Box, Button, Text } from 'native-base'
import RazorpayCheckout from 'react-native-razorpay'
import DrawerButton from '../component/DrawerButton'

const Subscription = ({navigation}) => {
    return (
        <>
       <DrawerButton onPress={() => navigation.toggleDrawer()} onPress1={() => navigation.navigate('Subscription')}/>
        <Box flex='1' flexDirection='row' justifyContent='center' alignItems='center'>
            <Button
                onPress={() => {
                    var options = {
                        description: 'Credits towards consultation',
                        image: 'https://i.imgur.com/3g7nmJC.jpg',
                        currency: 'INR',
                        key: 'rzp_test_DlIpJ3nkoh4NWt',
                        amount: '5000',
                        name: 'Acme Corp',
                        prefill: {
                            email: 'gaurav.kumar@example.com',
                            contact: '9191919191',
                            name: 'Gaurav Kumar'
                        },
                        theme: { color: '#53a20e' }
                    }
                    RazorpayCheckout.open(options).then((data) => {
                        // handle success
                        console.log(`Success: ${data.razorpay_payment_id}`);
                    }).catch((error) => {
                        // handle failure
                        console.log(`Error: ${error.code} | ${error.description}`);
                    });
                }}
                borderRadius="full" colorScheme="success">
                <Text>Default Small</Text>
            </Button>
        </Box>
        </>
    )
}

export default Subscription