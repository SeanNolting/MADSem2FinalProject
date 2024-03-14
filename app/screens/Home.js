import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import "react-native-gesture-handler"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EditProfile from './drawerscreens/EditProfile';
import Friends from './drawerscreens/Friends';
import Groups from './drawerscreens/Groups';
import Main from './drawerscreens/Main';

const Drawer = createDrawerNavigator();
export default function Home() {
  return (
      <Drawer.Navigator
       initialRouteName='Main'
       backBehavior='initialRoute'
       screenOptions={{headerShown: true}}>
          <Drawer.Screen name = "Social Sphere" component={Main}/>
          <Drawer.Screen name = "Edit Profile" component={EditProfile}/>
          <Drawer.Screen name = "Friends" component={Friends} />
          <Drawer.Screen name = "Groups" component={Groups}/>
      </Drawer.Navigator> 
  )
}

const styles = StyleSheet.create({})