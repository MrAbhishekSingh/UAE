import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('');

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert('please enter valid email and password');
          }
        },
        register: async (name, email, password,phone) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password,phone)
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    uid: auth().currentUser.uid,
                    displayName: name,
                    phone:phone,
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    plan_CreatedAt: null,
                    plan_status: null,
                    plan_Type:null,
                  })
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error,
                    );
                  });
              }).then((scusess)=>(
                Alert.alert('user scusess')
              ))
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};