import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Image, TouchableHighlight, TouchableOpacity, Platform, ScrollView } from 'react-native'
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
import { MultipleSelectList } from 'react-native-dropdown-select-list';


export default function CreateAccount({}) {
    const navigation = useNavigation();
    const myDataUniverites = [
        {key: '1', value: "Iowa State"},
        {key: "2", value: "MIT"},
        {key: "3", value: "Wisconsin"},
        {key: "4", value: "UIUC"}
    ]
    const [major, setMajor]= useState("");
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [selectedUniversity, setSelectedUniversity] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [bio, setBio] = useState("");


    const handleUniversitySelect = (selected) =>{
        console.log(selected);
        setSelectedUniversity(selected)
        
    }

    const handleHobbiesSelect = (selectedItems) => {
        console.log(selectedItems);
        if(typeof selectedItems === 'function'){
            console.error("selected items is not a function", selectedItems)
            return;
        }
        if(Array.isArray(selectedItems)){
            setSelectedHobbies(selectedItems.map(item => item.value));
        } else{
            console.error("Selected items is not an array", selectedItems)
        }
        
    }
    const myDataHobbies = [
      {key:'1', value:'Running'},
      {key:'2', value:'Reading'},
      {key:'3', value:'Coding'},
      {key:'4', value:'Baseketball'},
      {key:'5', value:'Knitting'},
      {key:'6', value:'Race Car Driving'},
  ]
    // const filterData = (item) =>
    // {
    //     //if the input is empty
    //     if(userInput === "")
    //     {
    //        return (
    //         <View>
    //         <Text>{item.name}</Text>
    //         </View>
    //         ) 
    //     }
    //     // if the user is in the search bar
    //     if(item.name.toLowerCase().includes(userInput.toLowerCase()  )){
    //         return(
    //         <View>
    //             <Text>{item.name}</Text>
    //         </View>
    //         )
    //     }

    // }

    

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
    // console.log(image);
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
        try{
            await addDoc(collection(db, "userInfo"),
        {
            firstName: firstName,
            lastName: lastName,
            major: major,
            university: selectedUniversity,
            bio: bio,
            hobbies: selectedHobbies,
        });
        console.log("User data has been added");
        }catch (error){
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
        data={myDataHobbies}
        label="Hobbies"
        save='value'
        setSelected={handleHobbiesSelect}
        onSelect={(selectedItems) => handleHobbiesSelect(selectedItems)}
        notFoundText='Search for a hobby'
        boxStyles={[{backgroundColor: "white"}, {width:250}]}
        dropdownStyles={{backgroundColor: "white"}}
        />
        <TextInput
          style={styles.textInputStyle}
          value={bio}
          placeholder='Biography' 
          placeholderTextColor="#000000"
          onChangeText={(text) => setBio(text)}
        />
        {/* <TextInput
          multiline
          style={styles.textInputStyle}
          value={extraInfo}
          placeholder='Extra info' 
          placeholderTextColor="#000000"
          onChangeText={(text) => setExtraInfo(text)}
        /> */}
        {/* <MyButton
        title={"Go to login"}
        color={"black"}
        onPress={() => navigation.navigate("Login")}
        /> */}
        <MyButton
        title={"Create Account"}
        color={colors.UCLABlue}
        onPress={() => dataAndNav()}
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
        flexDirection: "row",
        marginLeft: 5,
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
        width: 305,
        marginTop: 20,
        marginLeft: 11,
        backgroundColor: "white",
    },
    // flatlistStyle:
    // {
    //     backgroundColor: "white",
    // },
    profilePicture:
    {
        width: 100,
        height: 100,
        borderRadius: 50,
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
//     container:
//   {
//     backgroundColor: colors.UCLABlue,
//     flex: 1,
//   },
//   namesContainer:
//   {
//       alignItems: "center",
//       flexDirection:"row",
//       marginLeft: 35,
//   },
  text:
  {
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 10,
      color: "white",
  },
//   nameInputStyle:
//   {
//       borderWidth: 2,
//       borderColor: "#000000",
//       height: 50,
//       width: 150,
//       marginTop: 10,
//       marginLeft: 5,
//       backgroundColor: "white",
//   },
//   majorInputStyle:
//   {
//       borderWidth: 2,
//       borderColor: "#000000",
//       height: 50,
//       width: 305,
//       marginTop: 10,
//       marginLeft: 40,
//       backgroundColor: "white",
//   },
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
    marginTop: 10,
    backgroundColor: "white",
    marginBottom: 15,
  },
  headerTextStyle:
  {
    fontSize: 32,
    marginLeft: 10,
  },
})