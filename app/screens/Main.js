import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import colors from '../config/colors';
import firebase from 'firebase/app';
import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import 'firebase/database'
import { FIREBASEAPP, db, auth } from '../../Firebase/config';
import { getAuth } from 'firebase/auth';
import config from '../../Firebase/config'
import MyButton from '../components/MyButton';
import {useNavigation} from "@react-navigation/native";

   
export default function Main() {
    const navigation = useNavigation();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [usersWithSameUniversity, setUsersWithSameUniversity] = useState([]);
    const [currentUserDocId, setCurrentUserDocId] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [friendsList, setFriendsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isReloading, setIsReloading] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      const fetchUserData = async () => {
        try {
            await fetchCurrentUserData();
            fetchUsersWithSameUniversity();
        } catch (error) {
            console.log("Error fetching userData", error)
        }
    };
      const fetchCurrentUserData = async () => {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userCollectionRef = collection(db,"userInfo");
            const querySnapshot = await getDocs(query(userCollectionRef, where("userId", "==", currentUser.uid)))
            if(!querySnapshot.empty){
              const currentUserDoc = querySnapshot.docs[0];
              const currentUserDocId = currentUserDoc.id;
              console.log("Current User doc Id: ", currentUserDocId);

              setCurrentUserDocId(currentUserDocId);
              setCurrentUserData(currentUserDoc.data());
              setCurrentIndex(0);
              fetchUsersWithSameUniversity();
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
  
      if(isMounted){
        fetchUserData();
      }
      return() => {
        setIsMounted(false);
      }
    }, [isMounted]);
  
    const fetchUsersWithSameUniversity = async () => {
      try {
        if (currentUserData) {
          const userCollectionRef = collection(db, "userInfo");
          const universityQuery = query(userCollectionRef, where("university", "==", currentUserData.university));
          const userQuerySnapshot = await getDocs(universityQuery);
          const users = userQuerySnapshot.docs.map(doc => doc.data());
          const randomUser = users[Math.floor(Math.random() * users.length)];
          console.log("Random user", randomUser)
          setUsersWithSameUniversity([randomUser]);
            
        }
      } catch (error) {
        console.error("Error fetching users with same university: ", error);
      }
    };
 
    const addFriend = () => {
      if (usersWithSameUniversity.length > 0) {
          const friendData = usersWithSameUniversity[0];
          setFriendsList([...friendsList, friendData.id]);
          navigation.navigate('Friends', { friendId: friendData.id });
      }  
  };     
  const handleReload = () => {
    setIsReloading(true),
    fetchUsersWithSameUniversity()
    .then(() => setIsReloading(false))
    .catch(error => {
          console.error("Error with reloading", error);
           setIsReloading(false);
    });
    };
           
    const handleNextUser = () => {
    if(usersWithSameUniversity.length > 1) {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % usersWithSameUniversity.length)
    }
    };
    
    const handlePrevUser = () => {
    if(usersWithSameUniversity.length>1) {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + usersWithSameUniversity.length) % usersWithSameUniversity.length)
    }};
    // const auth=getAuth();
    // const fetchCurrentUserData = async () => 
    // {
    //   try{
    //     const currentUser = auth.currentUser;
    //     console.log("Current user:", currentUser)
    //     if(currentUser)
    //     {
    //       const currentUserDocRef = doc(db, "userInfo", currentUser.uid)
    //       console.log("Current user DOCREF", currentUserDocRef)
    //       console.log("Current user DOCID", currentUser.uid)
    //       const currentUserDocSnap = await getDoc(currentUserDocRef);
    //       console.log("Current user DOCREF", currentUserDocSnap)
    //     if(currentUserDocSnap.exists()){
    //       setCurrentUserData(currentUserDocSnap.data());
    //     } 
        
    //     else{
    //       console.log("Current user has no Docs")
    //     }
    //     } else {
    //       console.log("N0 current usr found")
    //     }
    //   } catch(error) {
    //     console.error("Error getting current user docs", error)
    //   }
    // }

  //   const fetchRandomUserData = async () => {
  //     try {
  //       if(currentUserData){
  //         const university =  currentUserData.university;
  //         const userCollectionRef = collection(db,"userInfo");
  //         const universityQuery = query(userCollectionRef, where("university", "==", university))
  //         const userQuerySnapshot = await getDocs(universityQuery);
  //         const userDocs = userQuerySnapshot.docs.map(doc => doc.data());
  //         const randomUser = userDocs[Math.floor(Math.random() * filteredUsers.length)]
  //       setRandomUserData(randomUser);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document: ", error);
  //     }
  //   };
  //   fetchCurrentUserData();
  // }, []);
  

    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <IconButton
            style={styles.leftArrow}
            icon="arrow-left"
            color="black"
            size={45}
            onPress={handlePrevUser}
          />
           {usersWithSameUniversity.length > 0 && usersWithSameUniversity[0].imageUri && (
        <Image  source={currentUserData ? { uri: usersWithSameUniversity[0].imageUri } : require('../../images/Gatorade.png')}
        style={{height: 300, width: 200, marginBottom: 10, marginLeft: 10, marginTop: 155, borderColor:"#000000", borderWidth: 3}}
        />
      )}   
          <IconButton
            style={styles.rightArrow}
            icon="arrow-right"
            color="black"
            size={45}
            onPress={handleNextUser}
          />  
          <View>
           <Text   multiline
       numberOfLines={4}  maxLength={10} style={styles.nameTextStyle}>Name: {usersWithSameUniversity.length > 0 ? `${usersWithSameUniversity[0].firstName} ${usersWithSameUniversity[0].lastName}` : ""} </Text>
          <Text style={styles.majorTextStyle}>Major: {usersWithSameUniversity.length > 0 ? usersWithSameUniversity[0].major : ""}</Text>
          <Text style={styles.bioTextStyle}>Biography: {usersWithSameUniversity.length > 0 ? usersWithSameUniversity[0].bio : ""} </Text>
          <Text style={styles.hobbiesTextStyle}>Hobbies: {usersWithSameUniversity.length > 0 && usersWithSameUniversity[0].hobbies ? usersWithSameUniversity[0].hobbies.join(", ") : ""}</Text>
          </View>
          
        </View> 
         <MyButton
        style={styles.viewMore}
        title={"Add Friend"}
        color={colors.delftBlue}
        width={150}
        height={50}
        marginLeft={122.5}
        marginTop={10}
        onPress={addFriend}
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
    marginTop: 290,
    marginLeft: 23,
  },
  profileContainer: {
    width: 375,
    height: 650,
    borderWidth: 5,
    marginLeft: 10,
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "white",
  },
  // viewMore: {
  //   width: 50,
  //   height: 50,
  //   marginTop: 250,
  //   marginLeft: 80,
  // },
  nameTextStyle:{
    marginTop: 480,
    marginLeft: -370,
    fontSize: 18,
  },
  majorTextStyle:{
    marginLeft: -370,
    fontSize: 18,
  },
  bioTextStyle:{
    marginLeft: -370,
    fontSize: 18,
  },
  hobbiesTextStyle:{
    marginLeft: -370,
    fontSize: 18,
  },

});