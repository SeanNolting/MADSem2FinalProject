import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../config/colors';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import MyButton from '../components/MyButton';
import { FIREBASEAPP, auth, db, storage } from '../../Firebase/config';
import { collection, addDoc, getFirestore, setDoc, doc, getDoc, query, getDocs, where} from "firebase/firestore";


export default function EditProfile () {
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const [major, setMajor]= useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
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

useEffect(() => {
  fetchCurrentUserData();
}, []);

const fetchCurrentUserData = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userCollectionRef = collection(db, "userInfo");
      const querySnapshot = await getDocs(query(userCollectionRef, where("userId", "==", currentUser.uid)))
      if (!querySnapshot.empty) {
        const currentUserDoc = querySnapshot.docs[0];
        const userData = currentUserDoc.data();
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setMajor(userData.major || '');
        setSelectedUniversity(userData.university || '');
        setSelectedHobbies(userData.hobbies || []);
        setBio(userData.bio || '');
        setExtraInfo(userData.extraInfo || '');
      } else {
        console.log("This user has no docs");
      }
    } else {
      console.log("No current user found");
    }
  } catch (error) {
    console.error("Error getting current user data", error);
  }
};

const updateUserProfile = async () =>
  {
    const currentUser = auth.currentUser;
    const userID = currentUser.uid;
    try{
  
    const userDocRef = doc(db, 'userInfo', userID)
      await setDoc(
        userDocRef,
        {
          firstName,
          lastName,
          major,
          university: selectedUniversity,
          hobbies: selectedHobbies,
          bio,
        },
        { merge: true }
      );

      const userDocSnapshot = await userDocRef.get();
      if(userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setMajor(userData.major || '');
        setSelectedUniversity(userData.university || '');
        setSelectedHobbies(userData.hobbies || []);
        setBio(userData.bio || '');
        
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  
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
          style={styles.flatlistStyle}
         boxStyles={[{ backgroundColor: "white" }, { width: 250 }]}
         dropdownStyles={{ backgroundColor: "white" }}
         data={myDataUniverites}
         setSelected={handleUniversitySelect}
         save='value'
      />
           <MultipleSelectList
           style={styles.flatlistStyle}
        setSelected={handleHobbiesSelect}
        onSelect={() => console.log(selected)}
        data={myDataHobbies}
        label="Hobbies"
        save='value'
        notFoundText='Search for a hobby'
        boxStyles={[{ backgroundColor: "white" }, { width: 250 }]}
        dropdownStyles={{ backgroundColor: "white" }} />
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
        <MyButton
        title={"Edit Profile"}
        color={colors.UCLABlue}
        marginTop={20}
        onPress={updateUserProfile}
        />
    </View>
  );
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
