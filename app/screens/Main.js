import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import colors from '../config/colors';
import firebase from 'firebase/app';
import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import 'firebase/database'
import { FIREBASEAPP, db } from '../../Firebase/config';
import config from '../../Firebase/config'
import MyButton from '../components/MyButton';

   
export default function Main() {
    const [currentUserData, setCurrentUserData] = useState(null);
    const [randomUserData, setRandomUserData] = useState(null);

  useEffect(() => {

    const fetchCurrentUserData = async () => 
    {
      try{
        const currentUserDocRef = doc(db, "userInfo", "P84UesqnYcwpZNtGYN4x") //replace with a variable that gets the current userID
        const currentUserDocSnap = await getDoc(currentUserDocRef);
        if(currentUserDocSnap.exists()){
          setCurrentUserData(currentUserDocSnap.data());
        } else{
          console.log("Current user has no Docs")
        }
      } catch(error) {
        console.error("Error getting current user docs", error)
      }
    }

    const fetchRandomUserData = async () => {
      try {
        const userCollectionRef = collection(db,"userInfo");
        const university = currentUserData ? currentUserData.university: "";
        const universityQuery = query(userCollectionRef, where("univeristy", "==", university))
        const userQuerySnapshot = await getDocs(universityQuery);
        const userDocs = [];
        userQuerySnapshot.forEach((doc) => {
          userDocs.push(doc.data());
        });
        const filteredUsers = userDocs.filter(user => user.id !== "P84UesqnYcwpZNtGYN4x")
        const randomDocId = filteredUsers[Math.floor(Math.random() * filteredUsers.length)]
        setRandomUserData(randomDocId);
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchCurrentUserData();
    fetchRandomUserData();
  }, [currentUserData]);

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <IconButton
            style={styles.leftArrow}
            icon="arrow-left"
            color="black"
            size={45}
          />
          <IconButton
            style={styles.rightArrow}
            icon="arrow-right"
            color="black"
            size={45}
      
          />
          
        </View> 
          <Text>Name: {randomUserData ? `${randomUserData.firstName} ${randomUserData.lastName}` : ""} </Text>
          <Text>Major: {randomUserData ? randomUserData.major : ""}</Text>
          <Text>Biography: {randomUserData ? randomUserData.bio : ""} </Text>
          <Text>Hobbies: {randomUserData ? randomUserData.hobbies + "" : ""} </Text>
          <MyButton color={colors.delftBlue}
            title={"View more"}
          />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UCLABlue,
  },
  leftArrow: {
    marginTop: 290,
  },
  rightArrow: {
    marginTop: 293,
    marginLeft: 73,
  },
  profileContainer: {
    width: 350,
    height: 600,
    borderWidth: 5,
    marginLeft: 20,
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "white",
  },
  viewMore: {
    width: 50,
    height: 50,
    marginTop: 250,
    marginLeft: 80,
  },
});