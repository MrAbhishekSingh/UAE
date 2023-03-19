import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';

export default function App({onSelectSwitch, current}) {
  const positionButton = useRef(new Animated.Value(1)).current;

  const [isOn, setIsOn] = useState(false);

  const startAnimToOff = () => {
    Animated.timing(positionButton, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  console.log('current', current);
  useEffect(() => {
    if (current) {
      setIsOn(true);
      startAnimToOn();
    }
  }, [current]);

  //   useEffect(() => {
  //     startAnimToOff();
  //     setIsOn(false);
  //     // onSelectSwitch(1);
  //   }, []);

  const startAnimToOn = () => {
    Animated.timing(positionButton, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // const onSelectSwitch = () =>{
  //     setIsOn(!isOn)
  // }

  const positionInterPol = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90],
  });

  const backgroundColorAnim = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const initialOpacityOn = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const initialOpacityOff = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const onPress = () => {
    if (isOn) {
      startAnimToOff();
      setIsOn(false);
      onSelectSwitch(1);
    } else {
      startAnimToOn();
      setIsOn(true);
      onSelectSwitch(0);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        activeOpacity={0.9}
        onPress={onPress}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.mainStyes}>
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: backgroundColorAnim,
              },
            ]}>
            <Animated.Text
              style={[
                styles.eahcStyles,
                {
                  opacity: initialOpacityOn,
                },
              ]}>
              ON
            </Animated.Text>
            <Animated.Text
              style={[
                styles.eahcStylesOf,
                {
                  opacity: initialOpacityOff,
                },
              ]}>
              OFF
            </Animated.Text>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateX: positionInterPol,
                    },
                  ],
                },
              ]}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.basicStyle}>
                <Icon
                  style={{transform: [{rotate: '270deg'}]}}
                  name="poweroff"
                  size={40}
                  color={isOn ? '#fb7185' : '#34d399'}
                />
              </LinearGradient>
            </Animated.View>
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    transform: [{rotate: '90deg'}],
    justifyContent: 'center',
    backgroundColor: '#7dd3fc',
    borderRadius: 20,
    height: 75,
    width: 180,
    padding: 2,
  },
  basicStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 75,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    elevation: 10,
  },
  eahcStyles: {
    fontSize: 14,
    color: '#f5dd4b',
    position: 'absolute',
    top: 20,
    left: 5,
    fontWeight: '700',
    transform: [{rotate: '270deg'}],
  },
  eahcStylesOf: {
    fontSize: 14,
    color: '#f4f3f4',
    position: 'absolute',
    top: 20,
    right: 5,
    transform: [{rotate: '270deg'}],
    fontWeight: '700',
  },
  mainStyes: {
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
  },
});
