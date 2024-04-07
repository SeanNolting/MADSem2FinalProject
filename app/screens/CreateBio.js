import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import {useNavigation} from "@react-navigation/native"; 
import MyButton from '../components/MyButton';
import Select from 'react-select';
// import { TextInput } from 'react-native-gesture-handler';
import colors from '../config/colors';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { FIREBASEAPP, db } from '../../Firebase/config';

 
export default function CreateBio({}) {
    const navigation = useNavigation();
    const [selected, setSelected ] = React.useState([]);
    const [selectedOptions, setSelectedOptions]= useState([]);
    const [bio, setBio] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const handleChange = (selected) => {
      setSelectedOptions(selected)
    }

    const myData = [
        {key:'1', value:'Running'},
        {key:'2', value:'Reading'},
        {key:'3', value:'Coding'},
        {key:'4', value:'Baseketball'},
        {key:'5', value:'Knitting'},
        {key:'6', value:'Race Car Driving'},
    ]
    // const myDataOptions = [
    //   {value:'running', label:"Running"},
    //   {value:'reading', label:"Reading"},
    //   {value:'coding', label:"Coding"},
    //   {value:'baseketball', label:"Coding"},
    //   {value:'knitting', label:"Knitting"},
    //   {value:'race car rriving', label:"Race Car Driving"},
    // ]

    const addAccountData = async () =>
    {
        try{
            await addDoc(collection(db, "userInfo"),
        {
            bio: bio,
            extraInfo: extraInfo,
        });
        console.log("User data has been added");
        }catch (error){
            console.error("Error adding user data ", error);
        }
        // const docRef = await addDoc(collection(db, "userInfo"),
        // {
        //     first: firstName,
        //     last: lastName,
        //     major: major,
        // }); 
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

      return (
    <View style={styles.container}>
        {/* <SelectList
        setSelected={(val) => setSelected(val)}
        data ={Mydata}
        save='value'
        /> */}
        <Text style={styles.headerTextStyle}>Select some hobbies</Text>
        <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={myData}
        label="Hobbies"
        save='key'
        onSelect={() => console.log(selected)}
        notFoundText='Search for a hobby'
        boxStyles={[{backgroundColor: "white"}, {width:250}]}
        dropdownStyles={{backgroundColor: "white"}}
        />
        <TextInput
          multiline
          style={styles.textInputStyle}
          value={bio}
          placeholder='Biography' 
          placeholderTextColor="#000000"
          onChangeText={(text) => setBio(text)}
        />
        <TextInput
          multiline
          style={styles.textInputStyle}
          value={extraInfo}
          placeholder='Extra info' 
          placeholderTextColor="#000000"
          onChangeText={(text) => setExtraInfo(text)}
        />
        <MyButton
        title={"Go to create Screen"}
        color={"black"}
        onPress={() => navigation.navigate("Create Account")}
        />
        <MyButton
        title={"Go to Home Screen"}
        color={"black"}
        onPress={() => dataAndNav()}
        />
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
  textInputStyle:
  {
    borderWidth: 2,
    borderColor: "#000000",
    width: 350,
    height: 100,
    marginLeft: 10,
    padding: 5,
    marginTop: 10,
    backgroundColor: "white"
  },
  headerTextStyle:
  {
    fontSize: 32,
    marginLeft: 10,
  },

})