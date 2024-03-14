import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import Login from './app/screens/Login';
import CreateAccount from './app/screens/CreateAccount';
import CreateBio from './app/screens/CreateBio';
import Home from './app/screens/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={[{headerBackTitleVisible:false}]}>
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Create Account" component={CreateAccount}/>
      <Stack.Screen name = "Create Bio" component={CreateBio}/>
      <Stack.Screen name = "Home" component={Home}/>
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
