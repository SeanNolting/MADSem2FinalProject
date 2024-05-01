import React, { useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native'
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer"
import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';
import 'firebase/database'
import { FIREBASEAPP, db } from '../../Firebase/config';
import config from '../../Firebase/config'

const CustomDrawer = (props) => {
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
    return(
        <View style={{flex:1}} >
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:"#FFFFFF"}}>
            <Image source={require("../../images/Gatorade.png")}
            style={{height: 100, width: 100, borderRadius:50, marginBottom: 10, marginLeft: 5, borderColor:"#000000", borderWidth: 3}}
            />
            <Text style={{color:"#000000", marginBottom: 10,  marginLeft: 10, fontSize: 16}}>Name: {userData ? `${userData.firstName} ${userData.lastName}` : ""}</Text>
            <Text style={{color:"#000000", marginBottom: 10, marginLeft: 10, fontSize: 16}}>Major:  {userData ? userData.major : ""}</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View>
        </View>
        </View>
    )
}

export default CustomDrawer