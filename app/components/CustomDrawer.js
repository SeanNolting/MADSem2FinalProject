import React, { useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native'
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer"
import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import 'firebase/database'
import { FIREBASEAPP, db, auth } from '../../Firebase/config';
import config from '../../Firebase/config'

const CustomDrawer = (props) => {
    const [userData, setUserData] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [currentUserDocId, setCurrentUserDocId] = useState(null);

    useEffect(() => {
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
  
      fetchCurrentUserData();
    }, []);
    return(
        <View style={{flex:1}} >
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:"#FFFFFF"}}>
            <Image source={require("../../images/Gatorade.png")}
            style={{height: 100, width: 100, borderRadius:50, marginBottom: 10, marginLeft: 5, borderColor:"#000000", borderWidth: 3}}
            />
            <Text style={{color:"#000000", marginBottom: 10,  marginLeft: 10, fontSize: 16}}>Name: {currentUserData ? `${currentUserData.firstName} ${currentUserData.lastName}` : ""}</Text>
            <Text style={{color:"#000000", marginBottom: 10, marginLeft: 10, fontSize: 16}}>Major: {currentUserData ? currentUserData.major : ""}</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View>
        </View>
        </View>
    )
}

export default CustomDrawer