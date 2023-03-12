import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  line:{
    backgroundColor:'#fff',
    height:hp('0.4%'),
    width:wp('35%'),
    alignSelf:'center',
    margin:hp('1%'),
    borderColor:'#fff'
  },
  logo: {
    height: hp('7.3%'),
    width: wp('14%'),
    resizeMode:'contain',
    alignSelf:'center'
  },
  btn:{
    borderRadius:hp('50%'),
    width:wp('16%'),
    height:hp('8%'),
    flexDirection:'column',
    justifyContent:'center',
    resizeMode:'contain',
  },
  btncontainer:{
    alignItems:'center',
    justifyContent:'center',
    height:hp('13%'),
  },
  btnSignup:{
    flexDirection:'row',
    justifyContent:'center',
    margin:hp('0.5%')
  },
  signupText:{
    fontWeight:"700",
    fontSize: hp('2%'),
    color:'#fff'
  },
  acountText:{
    fontSize: hp('2%'), 
    color:'#fff'
  },
  usericon:{
    height:hp('23%'),
    justifyContent:'flex-end',
    marginBottom:hp('2%')
  }
});