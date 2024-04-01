import { StyleSheet, Text, View,} from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import MyButton from '../components/MyButton'
import colors from '../config/colors'

export default function Main() {
  return (
    <View>
      <View style={styles.profileContainer}>
      <IconButton
      style={styles.leftArrow}
      icon="arrow-left"
      color="black"
      size={45}
      />
      <IconButton
      style={styles.rightArrow}
      icon="arrow-right"
      color="black"
      size={45}/>

      <MyButton
      title={"View More"}
      color={colors.UCLABlue}
      
      />
    
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  leftArrow:
  {
    marginTop: 290,
  },
  rightArrow:
  {
    marginTop: 293,
    marginLeft: 203,
  },
  profileContainer:
  {
    width: 350,
    height: 600,
    borderWidth: 5,
    marginLeft: 20,
    flexDirection: "row",
    marginTop: 15,
  },

})