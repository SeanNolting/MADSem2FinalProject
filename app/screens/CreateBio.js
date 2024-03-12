import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MultipleSelectList } from 'react-native-select-dropdown'
import { useState } from 'react';
import {useNavigation} from "@react-navigation/native";
 
export default function CreateBio({}) {
    const [selected, setSelected ] = React.useState([]);

    const Mydata = [
        {key:'1', value:'Running'},
        {key:'2', value:'Reading'},
        {key:'3', value:'Coding'},
        {key:'4', value:'Baseketball'},
        {key:'5', value:'Knitting'},
        {key:'6', value:'Race Car Driving'},
    ]

      return (
    <View>
        <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={Mydata}
        />
    </View>
  )
}

const styles = StyleSheet.create({})