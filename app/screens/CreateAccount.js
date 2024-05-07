import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Image, TouchableHighlight, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { collection, addDoc, getFirestore, setDoc } from "firebase/firestore";
import colors from '../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, IconButton } from 'react-native-paper';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { FIREBASEAPP, auth, db, storage } from '../../Firebase/config';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import 'firebase/database'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default function CreateAccount({}) {

    const navigation = useNavigation();
    const myDataUniverites = [
        {key: '1', value: "Iowa State"},
        {key: "2", value: "MIT"},
        {key: "3", value: "Wisconsin"},
        {key: "4", value: "UIUC"},
        {key: "5", value: "Butler"},
        {key: "6", value: "Denison"},
        {key: "7", value: "Minnisota"},
        {key: "8", value: "Purdue"},
        {key: "9", value: "Indiana"},
    ]
    const [major, setMajor]= useState("");
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [selectedUniversity, setSelectedUniversity] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [bio, setBio] = useState("");
    const [userId, setUserId]= useState("");

    const [selected, setSelected] = React.useState([]);

    const handleUniversitySelect = (selected) =>{
        console.log(selected);
        setSelectedUniversity(selected)
    }
    const handleHobbiesSelect = (selectedItems) => {
        console.log(selectedItems);
        setSelectedHobbies(selectedItems)
    }
    const myDataHobbies = [
      {key:'1', value:'Running'},
      {key:'2', value:'Reading'},
      {key:'3', value:'Coding'},
      {key:'4', value:'Baseketball'},
      {key:'5', value:'Knitting'},
      {key:'6', value:'Race Car Driving'},
      {key:'7', value:'Baking'},
      {key:'8', value:'Slime making'},
      {key:'9', value:'Soccer'},
      {key:'10', value:'Volleyball'},
  ]

    const [image, setImage] = useState(null);
    const pickImage = async () => {
        try{
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false){
                alert("Camera roll acess required");
                return;
                
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            });
            if(!result.cancelled){
                console.log('Image picker result:', result);
                console.log("Selected image:", image);
                setImage(result.uri);
                
            }
        } catch (error){
            console.error("Error picking image", error )
        }
    }

    const uploadImage = async(uri) =>{
        try{
            const currentUser = auth.currentUser;
            if(!currentUser){
                throw new Error("No current user found");
            }
            const filename = `${currentUser.uid}_profile_picture.jpg`;
            const storageRef = storage().ref().child('profilePictures/' + filename)
            const response = await fetch(uri);
            const blob = await response.blob();
            await storageRef.put(blob);
            const downloadURL = await storageRef.getDownloadURL();
            return downloadURL;
        
        } catch(error){
            console.error("error uploading image", error)
            throw error;
        }

        
    } 

    const [userData, setUserData] = useState("");
    const addAccountData = async () => {
        try {
            const currentUser = auth.currentUser;
            const imageUri = await uploadImage(image);
            if (currentUser) 
            { 
                await addDoc(collection(db, "userInfo"), {
                    firstName: firstName,
                    lastName: lastName,
                    major: major,
                    university: selectedUniversity,
                    bio: bio,
                    hobbies: selectedHobbies,
                    userId: currentUser.uid, 
                    imageUri: imageUri,
                });
                console.log("User data has been added");
            } else {
                console.error("No current user found");
            }
        } catch (error) {
            console.error("Error adding user data ", error);
        }
    }
     const nextScreen = () =>
    {
        navigation.navigate("Home");
    }

    const dataAndNav = async () =>
    {
        await addAccountData();
        nextScreen();
    }

    const deviceHeight = useWindowDimensions()
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding': 'height'}> 
       <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={100} keyboardShouldPersistTaps="handled">
                 <Text style={styles.text}>Choose your profile picture</Text>
                 <TouchableHighlight onPress={pickImage}>
                    <View>
                        {image ? (
                            <Image source={{uri: image}} style={styles.profilePicture}/>
                        ) : (
                            <View style={styles.placeholderContainer}>
                                <IconButton icon="camera" size={24} color="black"/>
                            </View>
                        )}
                    </View>
                 </TouchableHighlight>
                 {/* <Image uri={image} style={styles.profilePicture} /> 
                    <Modal
                    animationType="none"
                    transpaerent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}>
                        <SafeAreaView style={styles.centerScreen}>
                            <SafeAreaView style={styles.modalStyle}>
                                <Text>Camera</Text> 
                                <IconButton
                                style={styles.modalButton}
                                icon="camera"
                                color="black"
                                size={45}
                                onPress={() => setModalVisible(!modalVisible)}
                                />
                                <IconButton
                                style={styles.modalButton}
                                icon="arrow-left"
                                color="black"
                                size={45}
                                onPress={() => setModalVisible(!modalVisible)}
                                />
                            </SafeAreaView> 
                        </SafeAreaView>
                    </Modal> 
                    <TouchableHighlight onPress={() => setModalVisible(true)}>
                    <Entypo name = "pencil" size={20} color="white"/>
                    </TouchableHighlight> */}

                    <Text style={styles.text}>Enter your name</Text>
                    <View style={styles.namesContainer}>
                    <TextInput
                        value={firstName}
                        placeholder='First Name' 
                        onChangeText={(text) => setFirstName(text)}
                        style={styles.nameInputStyle}
                        />
                    <TextInput
                        value={lastName}
                        placeholder='Last Name' 
                        onChangeText={(text) => setLastName(text)}
                        style={styles.nameInputStyle}
                        />
                    </View>
                    <Text style={styles.text}>What are you majoring in</Text>
                    <TextInput
                    value={major}
                    placeholder='Major' 
                    onChangeText={(text) => setMajor(text)}
                    style={styles.majorInputStyle}
                    />
                    <Text style={styles.text}>Seach for your university</Text>
                    <SelectList 
                    boxStyles={[{backgroundColor: "white"}, {width:250}]}
                    dropdownStyles={{backgroundColor: "white"}}
                    data={myDataUniverites}
                    setSelected={handleUniversitySelect}
                    save='value'
                    />
                    <Text style={styles.text}>Pick some of your hobbies</Text>
                    <MultipleSelectList
                    setSelected={handleHobbiesSelect}
                    onSelect={() => console.log(selected)}
                    data={myDataHobbies}
                    label="Hobbies"
                    save='value'
                    notFoundText='Search for a hobby'
                    boxStyles={[{backgroundColor: "white"}, {width:250}]}
                    dropdownStyles={{backgroundColor: "white"}}
                    />
                    <Text style={styles.text}>Tell us about yourself</Text>
                    <TextInput
                    style={styles.textInputStyle}
                    value={bio}
                    placeholder='Biography' 
                    placeholderTextColor="#000000"
                    onChangeText={(text) => setBio(text)}
                    />
                    <MyButton
                    title={"Create Account"}
                    color={colors.UCLABlue}
                    onPress={() => dataAndNav()}
                    />  
        </KeyboardAwareScrollView> 
    </KeyboardAvoidingView> 
  )
}

const styles = StyleSheet.create({

    ScrollView:{
        flex: 1,
    },
    container:
    {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.delftBlue,
    },
    namesContainer:
    {
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 5,
        marginBottom: 5,
    },
    nameInputStyle:
    {
        borderWidth: 2,
        borderColor: "#000000",
        height: 50,
        width: 150,
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: "white",
    },
    majorInputStyle:
    {
        borderWidth: 2,
        borderColor: "#000000",
        height: 50,
        width: 305,
        marginTop: 5,
        marginLeft: 11,
        backgroundColor: "white",
    },
    profilePicture:
    {
        width: 200,
        height: 200,
        borderRadius: 50,
        // borderColor: "black",
        // borderWidth: 5,
        // backgroundColor: "white",
        marginTop: 5,
    },
    modalStyle:
    {
        height: 100,
        width: 250,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 65,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "row"
    },
    centerScreen:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    modalButton:
    {
        borderRadius: 10,
        elevation: 2,
        padding: 15,
        width: 70,
        height: 70,
    },
    text:
    {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
        color: "white",
        backgroundColor: colors.UCLABlue,
        borderColor: colors.UCLABlue,
        borderWidth: 5,
    },
  flatlistStyle:
  {
    backgroundColor: "white", 
    width:250, 
    marginLeft: 65,
    marginTop: 20,
  },
  textInputStyle:
  {
    borderWidth: 2,
    borderColor: "#000000",
    width: 350,
    height: 100,
    marginLeft: 10,
    padding: 5,
    marginTop: 5,
    backgroundColor: "white",
    marginBottom: 15,
  },
  headerTextStyle:
  {
    fontSize: 32,
    marginLeft: 10,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    borderRadius: 50,
},
placeholderText: {
    marginTop: 8,
    fontSize: 16,
    color: 'black',
},
})