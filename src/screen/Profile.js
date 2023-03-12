import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DrawerButton from '../component/DrawerButton';
// import ArrowButton from '../CustomButtonMain/ArrowButton';
// import OfferDetail from '../CustomPlan/OfferDetail';


const Profile = ({ navigation }) => {
    return (
        <>
     <DrawerButton onPress={() => navigation.toggleDrawer()} onPress1={() => navigation.navigate('Subscription')}/> 
      <View style={{flex:1}}>
            {/* <ArrowButton onPress={() => navigation.navigate('Tab')} /> */}
            <Text style={styles.title}>
                Plan
            </Text>
            <Image
                style={styles.image}
                source={require('../assets/as.png')}
            />
            <Text style={styles.heading}>
                Elic premium
            </Text>
            <Text style={styles.description}>
                an publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate
            </Text>
            {/* <OfferDetail title='60% Off on our partner shops' />
            <OfferDetail title='10 Free scope icre-creams' />
            <OfferDetail title='New coupon everyday' />
            <OfferDetail title='New coupon everyday' /> */}
            <Text style={styles.footerText}>
                Choose a plan
            </Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.planBox}>
                    <Text style={styles.boxTitle}>Monthly</Text>
                    <Text style={styles.boxPrice1}>$9.99</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.planBox}>
                    <Text style={styles.boxTitle}>Yearly</Text>
                    <Text style={styles.boxDicount}>$120.00</Text>
                    <Text style={styles.boxPrice2}>$95.99</Text>
                </TouchableOpacity>
            </View>


        </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    title: {
        alignSelf: 'center',
        marginTop: 50,
        color: 'white',
        fontFamily: 'AvertaStd-Bold',
        fontSize: 28
    },
    heading: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'AvertaStd-Bold',
        fontSize: 35,
        color: 'white',
    },
    description: {
        margin: 15,
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'AvertaStd-Regular',
        fontSize: 15,
        lineHeight: 25,
        color: 'white',
    },
    image: {
        alignSelf: 'center',
        width: 90,
        height: 71,
        marginTop: 30
    },
    footerText: {
        alignSelf: 'center',
        marginTop: 25,
        fontFamily: 'AvertaStd-Bold',
        fontSize: 28,
        color: 'white',
    },
    container:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 15,
        marginTop:20 
    },
    planBox:{
        height: 150,
         width: '45%', 
         borderRadius: 15, 
         backgroundColor: 'white', 
         opacity: 0.5
    },
    boxTitle:{
        alignSelf:'center',
        marginTop:20,
        fontSize:18,fontFamily: 'AvertaStd-Bold',
        color:'#070923'
    },
    boxPrice1:{
        alignSelf:'center',
        marginTop:50,
        fontSize:30,
        fontFamily: 'AvertaStd-ExtraBold',
        color:'#070923'
    },
    boxPrice2:{
        alignSelf:'center',
        marginTop:15,
        fontSize:30,
        fontFamily: 'AvertaStd-ExtraBold',
        color:'#070923'
    },
    boxDicount:{
        alignSelf:'center',
        marginTop:15,
        fontSize:18,
        fontFamily: 'AvertaStd-Bold',
        color:'#070923',
        opacity:0.5,
        textDecorationLine: 'line-through',
    }
    
});