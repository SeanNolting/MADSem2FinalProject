import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";
import { FIREBASEAPP, auth, db } from '../../Firebase/config';
// import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import colors from '../config/colors';
import { Icon } from '@rneui/base';

export default function Login({}) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    

    const signIn = async () =>
    {
        setLoading(true);
        try{
            const response  = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Welcome");
            navigation.navigate("Home")
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
            const response = await createUserWithEmailAndPassword(auth, email, password)
            // const userId = response.user.uid;
            console.log(response);
            alert("Check your emails");
            navigation.navigate("Create Account")
        }catch (error){
            console.log(error);
            alert("Sign Up failed:" + error.message);
        } finally{
            setLoading(false);
        }
    }
  return (
    <View style={styles.container}>
        <Text style={styles.headerStyle}>Social Sphere</Text>
        <Image style={styles.image} 
        source={require('../../images/social-sphere-high-resolution-logo-white.png')}/>
        <TextInput 
        style={styles.textInput}
        value={email}
        placeholder='Email' 
        onChangeText={(text) => setEmail(text)}>
        </TextInput>
        <TextInput 
        style={styles.textInput}
        secureTextEntry={true}
        value={password}
        placeholder='Password' 
        onChangeText={(text) => setPassword(text)}>
        </TextInput>
        {loading ? <ActivityIndicator size="large" color="#0000ff"/>
        : <>
        <MyButton title={"Login"} onPress={signIn} color={colors.UCLABlue}/>
        <MyButton title={"Create Account"} onPress={signUp}color={colors.UCLABlue}/>
        </>}
        {/* <MyButton
        title={"Go to create Screen"}
        color={"black"}
        onPress={() => navigation.navigate("Create Account")}
        /> */}
    </View>
  )
}

const styles = StyleSheet.create({

    container:
    {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.delftBlue,
    },
    text:
    {
        fontSize: 24,
        fontWeight: "bold",
        
    },
    textInput:
    {
        backgroundColor: "white",
        borderColor:"black",
        borderWidth: 2,
        width: 350,
        height: 50,
        padding: 2,
        marginBottom: 15,
        marginTop: 5,
        marginLeft: 10,
    },
    image:
    {
        height: 200,
        width: 200,
        marginLeft: 10,
    },
    headerStyle:
    {
        fontSize: 48,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        color: "white",
    }
})