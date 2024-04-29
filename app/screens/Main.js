import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import colors from '../config/colors';
import firebase from 'firebase/app';
import {doc, getDoc} from 'firebase/firestore';
import 'firebase/database'
import { FIREBASEAPP, db } from '../../Firebase/config';
import config from '../../Firebase/config'
import MyButton from '../components/MyButton';

   
export default function Main() {

    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "userInfo", "Bske2zvRYPMICKUhBNNA");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchUserData();
  }, []);

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
          <Text>Name: {userData ? `${userData.firstName} ${userData.lastName}` : ""} </Text>
          <Text>Major:  {userData ? userData.major : ""}</Text>
          <Text>Biography:  {userData ? userData.bio : ""} </Text>
          <Text>Hobbies:  {userData ? userData.hobbies + "" : ""} </Text>
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