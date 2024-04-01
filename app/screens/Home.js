import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import "react-native-gesture-handler"
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './app/screens/Main';
import EditProfile from './app/screens/EditProfile';
import Friends from './app/screens/Friends';
import Groups from './app/screens/Groups';
import Favorites from './app/screens/Favorites'
import ViewMore from './app/screens/ViewMore'


const Drawer = createDrawerNavigator();
export default function Home() {
  return (
    <Drawer.Navigator
    drawerContent= {
      (props) => {
        return(
          <SafeAreaView>
            <View
            style={{height:200,
            width: "100%",
            backgroundColor: "black"}}
            >
            </View>
            <DrawerItemList {...props}/>
          </SafeAreaView>
        )
      }
    }
    initialRouteName='Main'
    backBehavior='initialRoute'
    screenOptions={{headerShown: true}}>
       <Drawer.Screen 
       name = "Social Shphere" 
       component={Main}
       />
       <Drawer.Screen 
       name = "Edit Profile" 
       component={EditProfile}/>
       <Drawer.Screen 
       name = "Friends" 
       component={Friends} />
       <Drawer.Screen 
       name = "Groups" 
       component={Groups}/>
        <Drawer.Screen 
       name = "Favorites" 
       component={Favorites}/>
        <Drawer.Screen 
       name = "View More" 
       component={ViewMore}/>
   </Drawer.Navigator> 
  )
}

const styles = StyleSheet.create({})