import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import "react-native-gesture-handler"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './app/screens/Main';
import EditProfile from './app/screens/EditProfile';
import Friends from './app/screens/Friends';
import Groups from './app/screens/Groups';

const Drawer = createDrawerNavigator();
export default function Home() {
  return (
    <Drawer.Navigator
    initialRouteName='Main'
    backBehavior='initialRoute'
    screenOptions={{headerShown: false}}>
       <Drawer.Screen name = "Social Shphere" component={Main}/>
       <Drawer.Screen name = "Edit Profile" component={EditProfile}/>
       <Drawer.Screen name = "Friends" component={Friends} />
       <Drawer.Screen name = "Groups" component={Groups}/>
   </Drawer.Navigator> 
  )
}

const styles = StyleSheet.create({})