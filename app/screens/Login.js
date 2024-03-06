import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";

export default function Login({}) {
    const naviagtion = useNavigation();
  return (
    <View styles={styles.container}>
        <Text style={styles.text}>Login Screen</Text>
        <MyButton
        title={"Go to create Screen"}
        backgroundcolor={"Black"}
        onPress={() => naviagtion.navigate("Create Account")}
        />
    </View>
  )
}

const styles = StyleSheet.create({

    container:
    {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text:
    {
        fontSize: 24,
        fontWeight: "bold",
    },
})