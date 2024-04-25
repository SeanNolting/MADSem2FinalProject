import React from 'react'
import {View, Text, Image} from 'react-native'
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer"

const CustomDrawer = (props) => {
    return(
        <View style={{flex:1}} >
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:"#FFFFFF"}}>
            <Image source={require("../../images/Gatorade.png")}
            style={{height: 100, width: 100, borderRadius:50, marginBottom: 10, marginLeft: 5, borderColor:"#000000", borderWidth: 3}}
            />
            <Text style={{color:"#000000", marginBottom: 10,  marginLeft: 10, fontSize: 16}}>Name: placeholder</Text>
            <Text style={{color:"#000000", marginBottom: 10, marginLeft: 10, fontSize: 16}}>Major: placeholder</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View>
        </View>
        </View>
    )
}

export default CustomDrawer