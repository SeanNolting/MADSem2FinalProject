import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import Login from './app/screens/Login';
import CreateAccount from './app/screens/CreateAccount';
import CreateBio from './app/screens/CreateBio';
// import Home from './app/screens/Home';
import Main from './app/screens/Main';
import EditProfile from './app/screens/EditProfile';
import Friends from './app/screens/Friends';
import Groups from './app/screens/Groups';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer()
{
  return(
    <Drawer.Navigator
    initialRouteName='Main'
    backBehavior='initialRoute'
    screenOptions={{headerShown: false}}>
       <Drawer.Screen name = "Home" 
       component={Main} 
       />
       <Drawer.Screen name = "Edit Profile" component= {EditProfile}/>
       <Drawer.Screen name = "Friends" component={Friends} />
       <Drawer.Screen name = "Groups" component={Groups}/>
   </Drawer.Navigator> 
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' >
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Create Account" component={CreateAccount}/>
      <Stack.Screen name = "Create Bio" component={CreateBio}/>
      <Stack.Screen name = "Home" component={MyDrawer}/>
      {/* <Stack.Screen name = "Home" component={Home}/> */}
    </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
