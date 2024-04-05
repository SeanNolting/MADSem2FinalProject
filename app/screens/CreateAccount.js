import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Image, TouchableHighlight, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import colors from '../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, IconButton } from 'react-native-paper';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { FIREBASEAPP, db } from '../../Firebase/config';


export default function CreateAccount({}) {
    const navigation = useNavigation();
    const myDataUniverites = [
        {key: '1', value: "Iowa State"},
        {key: "2", value: "MIT"},
        {key: "3", value: "Wisconsin"},
    ]
    const [userInput, setUserInput] = useState("");
    const [selected, setSelected ] = React.useState([]);
    const [major, setMajor]= useState("");
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
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

    

    // useEffect(() => {
    //    requestMediaLibraryPermissionsAsync();
    // }, []);
    // const requestMediaLibraryPermissionsAsync = async () => {
    //     if(Platform.OS !== 'web')
    //     {
    //         const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if(status !== 'granted')
    //         {
    //             alert("Camera Roll access is required to upload a profile picture")
    //         }
    //     }
    // }

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState();
    console.log(image);
    const pickImage = async () =>
    {
        try{
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.front,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })

            if(!result.canceled)
            {
                await saveImage(result.uri);
            }
        } catch (error){

        }
    };

    
    const saveImage = async (image) => 
    {
        try{
            setImage(image);
        } catch (error){
            throw error;
        }
    };

    const [userData, setUserData] = useState("");
    
    const addAccountData = async () =>
    {
        const docRef = await addDoc(collection(db, "userInfo"),
        {
            first: "Kuldeep",
            last: "Debnath",
            major: "CS",
        }); 
    }
     const nextScreen = () =>
    {
        navigation.navigate("Create Bio");
    }

    const dataAndNav = async () =>
    {
        await addAccountData();
        nextScreen();
    }

    // const saveUserDataToFireStore = (userData) => 
    // {
    //     firebase.firestore().collection("userInfo").add(userData).then((docRef) =>
    //     {
    //         console.log("Document written with ID: " + docRef.id)
    //     })
    //     .catch((error) => {
    //             console.log("Error adding document", error)
    //         });
    // };


    // const handleSaveUserData = () => 
    // {
    //     const userData ={
    //         firstName: firstName,
    //         lastName: lastName,
    //         major: major,
    //     };
    //     // saveUserDataToFireStore(userData);
    // }

  

   

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Create Account Screen</Text>
        <Image uri={image} style={styles.profilePicture} /> 
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
        </TouchableHighlight>
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
        <TextInput
        value={major}
        placeholder='Major' 
        onChangeText={(text) => setMajor(text)}
        style={styles.majorInputStyle}
        />
        {/* <TextInput placeholder='Search for your university' onChangeText={(text) => setUserInput(text)}>
        </TextInput> */}
        <Text style={styles.text}>Seach for your university</Text>
        <SelectList 
        boxStyles={[{backgroundColor: "white"}, {width:250}]}
        dropdownStyles={{backgroundColor: "white"}}
        setSelected={(val) => setSelected(val)}
        data ={myDataUniverites}
        save='value'
        />
        {/* <FlatList
        data = {myData}
        renderItem = {({ item, index }) => (filterData(item))}/> */}
        <MyButton
        title={"Go to login"}
        color={"black"}
        onPress={() => navigation.navigate("Login")}
        />
        <MyButton
        title={"Go to Create Bio"}
        color={"black"}
        onPress={() => addAccountData()}
        />
    </SafeAreaView>
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
    namesContainer:
    {
        alignItems: "center",
        flexDirection:"row"
    },
    text:
    {
        fontSize: 24,
        fontWeight: "bold",
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
        width: 300,
        marginTop: 20,
        marginLeft: 5,
        backgroundColor: "white",
    },
    flatlistStyle:
    {
        backgroundColor: "white",
    },
    profilePicture:
    {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 5,
        backgroundColor: "white"
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
})