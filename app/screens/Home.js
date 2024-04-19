import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerItemList, createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './app/screens/Main';
import EditProfile from './app/screens/EditProfile';
import Friends from './app/screens/Friends';
import Groups from './app/screens/Groups';
import Favorites from './app/screens/Favorites'
import ViewMore from './app/screens/ViewMore'


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return(
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Hello World</Text>
      </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}
export default function Home() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <Drawer.Navigator
        initialRouteName='Main'
        backBehavior='initialRoute'
        screenOptions={{headerShown: true}}
        drawerContent={(props) => <CustomDrawerContent {...props}/>}>
          <Drawer.Screen name = "Social Shphere" component={Main}/>
          <Drawer.Screen name = "Edit Profile" component={EditProfile}/>
          <Drawer.Screen name = "Friends" component={Friends} />
          <Drawer.Screen name = "Groups" component={Groups}/>
          <Drawer.Screen name = "Favorites" component={Favorites}/>
          <Drawer.Screen name = "View More" component={ViewMore}/>
      </Drawer.Navigator> 
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: 'black',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 20,
  },
})