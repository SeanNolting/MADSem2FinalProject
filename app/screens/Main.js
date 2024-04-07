import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import colors from '../config/colors';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FIREBASEAPP, db } from '../../Firebase/config';
import config from '../../Firebase/config'


export default function Main() {
  // const DisplayData = () => {
  //   const [data, setData] = useState(null);
  //   // const [currentUserDocId, setCurrentUserDocId] = useState(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         firebase.auth().onAuthStateChanged((user) => {
  //           if (user) {
  //             const userId = user.uid;
  //             const userDocRef = firebase.firestore().collection('userInfo').doc(userId);
  //             userDocRef.get().then((userDocSnapshot) => {
  //               if (userDocSnapshot.exists) {
  //                 const userData = userDocSnapshot.data();
  //                 setData(userData);
  //               } else {
  //                 console.log('No user found with the given ID!');
  //               }
  //             }).catch((error) => {
  //               console.error('Error fetching user document: ', error);
  //             });
  //           } else {
  //             console.log('No user signed in.');
  //           }
  //         });
  //       } catch (error) {
  //         console.error('Error fetching document: ', error);
  //       }
  //     };
  //     fetchData();
    // }, []);

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
            style={styles.viewMore}
            icon="car"
            color="black"
            size={20}
          />
          <IconButton
            style={styles.rightArrow}
            icon="arrow-right"
            color="black"
            size={45}
          />
        </View> 
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