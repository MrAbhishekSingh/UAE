import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [userAllData, setMyData] = useState({});
  const getData = async () => {
    if (user !== null) {
      if (Object.keys(user).length > 0) {
        try {
          await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                // console.log('User Data', documentSnapshot.data());
                setMyData(documentSnapshot.data());
              }
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  useEffect(() => {
    getData();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        userAllData,
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert('please enter valid email and password');
          }
        },
        register: async (name, email, password, phone, country) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password, phone)
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    uid: auth().currentUser.uid,
                    displayName: name,
                    phone: phone,
                    email: email,
                    country: country,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    plan_CreatedAt_start: null,
                    plan_CreatedAt_end: null,
                    plan_status: null,
                    plan_details_id: null,
                    plan_Type: null,
                  })
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error,
                    );
                  });
              })
              .then(scusess => Alert.alert('user scusess'))
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
            setMyData({});
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
