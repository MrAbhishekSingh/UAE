

import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    countainer: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        borderWidth: wp('0.5%'),
        borderRadius: hp('50%'),
        width: wp('75%'),
        borderColor: '#6ee1f0',
        flexDirection: 'row',
        margin:wp('1%'),
        backgroundColor:'#edeceb',

    },
    img: {
        height: hp('5%'),
        width: wp('7%'),
        alignSelf: 'center',
        marginLeft: wp('4%'),
        resizeMode:'contain'
    },
    input: {
        height: hp('3.5%'),
        width: wp('55%'),
        margin: hp('1%'),
        padding: hp('0.3%'),
        fontSize: hp('2%'),
        fontWeight:'400',
        color:'black',
        marginLeft: wp('4%'),
    },
    inputText: {
        color: 'black',
        fontSize: hp('2%'),
        alignSelf: 'center',
    }

});