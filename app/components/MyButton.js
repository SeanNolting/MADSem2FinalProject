import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import React from 'react'

export default function MyButton({title, onPress, color}) {
  return (
    <TouchableHighlight 
    style={[styles.button, {backgroundColor: color}]}
    onPress={onPress}>
        <Text style={styles.text}> {title} </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    button:
    {
        backgroundColor: "Black",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    text: {
        color: "White",
        fontSize: 18,
        fontWeight: 'bold',
    }

})