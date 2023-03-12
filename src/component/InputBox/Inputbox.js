
import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { styles } from './style'

const Inputbox = ({ placeholder, value, onChangeText, error, secureTextEntry, source }) => {
    return (
        <>
            <View style={styles.countainer}>
                <TextInput
                    placeholderTextColor="black"
                    onChangeText={onChangeText}
                    value={value}
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                />
                <Image style={styles.img} source={source} />
            </View>
            <View>
                <Text style={styles.inputText}>{error}</Text>
            </View>
        </>
    )
}

export default Inputbox