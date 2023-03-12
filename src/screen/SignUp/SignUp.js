import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './style';
import Inputbox from '../../component/InputBox/Inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button} from 'native-base';
import { AuthContext } from '../../navigation/AuthProvider';

const SignUp = ({navigation}) => {
  const { register } = useContext(AuthContext)
  const handleSubmit = (values, actions) => {
    // actions.resetForm();
    register(values.name, values.email, values.password,values.phone)

  };

  const logiSchema = yup.object().shape({
    email: yup.string().email().required('Email is a required field'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(8, 'Your password is too short.'),
    retypePassword: yup
      .string()
      .required('Please confirm your password.')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    name: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your name'),
  });
  return (
    <>
      <LinearGradient
        colors={['transparent', 'transparent', 'transparent']}
        style={styles.linearGradient}>
        <Formik
          validationSchema={logiSchema}
          initialValues={{
            email: '',
            password: '',
            retypePassword: '',
            name: '',
            phone:+918892004977
          }}
          onSubmit={handleSubmit}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                  <View style={styles.usericon}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 50,
                        textAlign: 'center',
                        fontWeight: '700',
                      }}>
                      UAE VPN
                    </Text>
                    <Text
                      style={{
                        fontWeight: '700',
                        color: '#fff',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      CREATE ACCOUNT
                    </Text>
                  </View>
                  <View style={styles.line} />
                  <View style={{marginTop: 15}}>
                    <Inputbox
                      put
                      onChangeText={handleChange('name')}
                      value={values.name}
                      error={touched.name && errors.name}
                      placeholder={'Your nickname'}
                    />
                    <Inputbox
                      onChangeText={handleChange('email')}
                      value={values.email}
                      error={touched.email && errors.email}
                      placeholder={'Enter your email'}
                    />
                    <Inputbox
                      onChangeText={handleChange('password')}
                      value={values.password}
                      error={touched.password && errors.password}
                      placeholder={'Your password'}
                      secureTextEntry={true}
                    />
                    <Inputbox
                      onChangeText={handleChange('retypePassword')}
                      value={values.retypePassword}
                      error={touched.password && errors.retypePassword}
                      placeholder={'Confirm password'}
                      secureTextEntry={true}
                    />
                    <View style={styles.btncontainer}>
                      <TouchableOpacity onPress={handleSubmit}  style={{elevation: 5, justifyContent: 'center',
                            alignItems:'center',
                            flexDirection: 'row',}}>
                        <LinearGradient
                          colors={['#4c669f', '#3b5998', '#192f6a']}
                          style={{
                            borderRadius: 10,
                            padding: 10,
                            width: '80%',
                            flexDirection: 'row',
                            justifyContent:'center',
                            borderWidth:2,
                            borderColor:'#fff',
                            borderRadius:50
                          }}>
                          <Text style={styles.signupText}>SIGN UP</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnSignup}>
                      <Text style={styles.acountText}> have an Account? </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signupText}>Sign in</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </Formik>
      </LinearGradient>
    </>
  );
};

export default SignUp;
