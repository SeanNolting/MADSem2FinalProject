import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, Image, TouchableHighlight, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import MyButton from '../components/MyButton'
import {useNavigation} from "@react-navigation/native";
// import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { collection, addDoc } from "firebase/firestore";
import colors from '../config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
// import * as ImagePicker from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import placeholderImage from '../assets/emptyPhoto.jpg';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import { Modal } from 'react-native';

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

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Create Account Screen</Text>
        <Image uri={image} style={styles.profilePicture} />  
        {/* <Modal
        animationType="none"
        transpaerent={true}
        visible={modalVisible}
        >
            <Text>Modal button</Text>
        <MyButton
        title={"Modal button"}
        color="red"
        onPress={console.log("Modal Button Pressed")}
        />
        </Modal> */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Entypo name = "pencil" size={20} color="white"/>
        </TouchableOpacity>
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
        onPress={() => navigation.navigate("Create Bio")}
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
})