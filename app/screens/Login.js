import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";
import { auth } from '../../Firebase/config';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function Login({}) {
    const naviagtion = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = auth;

    const signIn = async () =>
    {
        setLoading(true);
        try{
            const response  = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Check your emails");
        } catch(error){
            console.log(error);
            alert("Sign in failed:" + error.message);
        } finally {
            setLoading(false);
        }
    }
    const signUp = async () =>
    {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Check your emails");
        }catch (error){
            console.log(error);
            alert("Sign Up failed:" + error.message);
        } finally{
            setLoading(false);
        }
    }
  return (
    <View styles={styles.container}>
        <Text style={styles.text}>Login Screen</Text>
        <TextInput 
        value={email}
        placeholder='Email' 
        onChange={(text) => setEmail(text)}>
        </TextInput>
        <TextInput 
        secureTextEntry={true}
        value={password}
        placeholder='Password' 
        onChange={(text) => setPassword(text)}>
        </TextInput>
        {loading ? <ActivityIndicator size="large" color="#0000ff"/>
        : <>
        {/* <MyButton title={"Login"} onPress={() =>}/> */}

        </>}
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