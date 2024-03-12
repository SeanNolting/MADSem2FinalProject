import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function CreateAccount({}) {
    const naviagtion = useNavigation();
    const myData = [
        {
            id: 1,
            name: "Iowa State",
        },
        {
            id: 2,
            name: "Princton",
        },
        {
            id: 3,
            name: "Stanford",
        },
        {
            id: 4,
            name: "Purdue",
        },
        {
            id: 5,
            name: "University of Illinois",
        },
    ]
    const[userInput, setUserInput] = useState("");

    const filterData = (item) =>
    {
        //if the input is empty
        if(userInput === "")
        {
           return (
            <View>
            <Text>{item.name}</Text>
            </View>
            ) 

        }
        // if the user is in the search bar
        if(item.name.toLowerCase().includes(userInput.toLowerCase()  )){
            return(
            <View>
                <Text>{item.name}</Text>
            </View>
            )
            
        }

    }
  return (
    <View styles={styles.container}>
        
        <TextInput placeholder='Name'>
        </TextInput>
        <TextInput placeholder='Major'>
        </TextInput>
        <TextInput placeholder='Search for your university' onChangeText={(text) => setUserInput(text)}>
        </TextInput>
        <FlatList
        data = {myData}
        renderItem = {({ item, index }) => (filterData(item))}/>


        <Text style={styles.text}>Create Account Screen</Text>
        <MyButton
        title={"Go to login"}
        backgroundcolor={"Black"}
        onPress={() => naviagtion.navigate("Login")}
        />
        <MyButton
        title={"Go to Create Bio"}
        backgroundcolor={"Black"}
        onPress={() => naviagtion.navigate("CreateBio")}
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
    flatlistStyle:
    {

    },
    flastListTextStyle:
    {

    },
})