import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import colors from '../config/colors';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import MyButton from '../components/MyButton';

export default function EditProfile() {
 
  const [selectedUnviersty, setSelectedUniversity] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [bio, setBio] = useState("");
  const [extraInfo, setExtraInfo] = useState("");

   const handleUniversitySelect = (selectedItem) =>{
        setSelectedUniversity(selectedItem.value)
        console.log(selectedItem);
    }

    const handleHobbiesSelect = (selectedItems) => {
        setSelectedHobbies(selectedItems.map(item => item.value))
        console.log(selectedItems);
    }
  const myDataHobbies = [
    {key:'1', value:'Running'},
    {key:'2', value:'Reading'},
    {key:'3', value:'Coding'},
    {key:'4', value:'Baseketball'},
    {key:'5', value:'Knitting'},
    {key:'6', value:'Race Car Driving'},
]
  const [userInput, setUserInput] = useState("");
  const [major, setMajor]= useState("");
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const myDataUniverites = [
    {key: '1', value: "Iowa State"},
    {key: "2", value: "MIT"},
    {key: "3", value: "Wisconsin"},
]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Profile</Text>
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
        <SelectList 
        boxStyles={styles.flatlistStyle}
        dropdownStyles={{backgroundColor: "white"}}
        onSelect={handleUniversitySelect}
        data ={myDataUniverites}
        save='value'
        />
        <MultipleSelectList
        data={myDataHobbies}
        label="Hobbies"
        save='key'
        onSelect={handleHobbiesSelect}
        notFoundText='Search for a hobby'
        boxStyles={styles.flatlistStyle}
        dropdownStyles={{backgroundColor: "white"}}
        />
        <TextInput
          multiline
          style={styles.textInputStyle}
          value={bio}
          placeholder='Biography' 
          placeholderTextColor="#000000"
          onChangeText={(text) => setBio(text)}
          numberOfLines={10}
          maxLength={300}
        />
        <TextInput
          multiline
          style={styles.textInputStyle}
          value={extraInfo}
          placeholder='Extra info' 
          placeholderTextColor="#000000"
          onChangeText={(text) => setExtraInfo(text)}
          numberOfLines={10}
          maxLength={300}
        />
        <MyButton
        title={"Edit Profile"}
        color={colors.UCLABlue}
        marginTop={20}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: colors.delftBlue,
    flex: 1,
  },
  namesContainer:
  {
      alignItems: "center",
      flexDirection:"row",
      marginLeft: 35,
  },
  text:
  {
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 130,
      color: "white",
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
      marginTop: 10,
      marginLeft: 40,
      backgroundColor: "white",
  },
  flatlistStyle:
  {
    backgroundColor: "white", 
    width:250, 
    marginLeft: 65,
    marginTop: 10,
  },
  textInputStyle:
  {
    borderWidth: 2,
    borderColor: "#000000",
    width: 350,
    height: 100,
    marginLeft: 20,
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