import { StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import React from 'react'

export default function MyButton({title, onPress, color, width, height, borderRadius}) {
  return (
    <TouchableHighlight 
    style={[styles.button, {backgroundColor: color}, {height: height}, {width: width}, {borderRadius: borderRadius}
    ]}
    onPress={onPress}>
        <Text style={styles.text}> {title} </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    button:
    {
      justifyContent: 'center',
      alignItems: 'center', 
      marginTop: 10
    },
    text: 
    {
      color:"white",
      fontSize: 18,
      fontWeight: 'bold',
    },

})