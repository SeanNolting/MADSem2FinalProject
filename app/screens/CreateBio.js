import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import {useNavigation} from "@react-navigation/native";
import MyButton from '../components/MyButton';
import Select from 'react-select';

 
export default function CreateBio({}) {
    const [selected, setSelected ] = React.useState([]);
    const [selectedOptions, setSelectedOptions]= useState([]);
    const handleChange = (selected) => {
      setSelectedOptions(selected)
    }

    const myData = [
        {key:'1', value:'Running'},
        {key:'2', value:'Reading'},
        {key:'3', value:'Coding'},
        {key:'4', value:'Baseketball'},
        {key:'5', value:'Knitting'},
        {key:'6', value:'Race Car Driving'},
    ]
    const myDataOptions = [
      {value:'running', label:"Running"},
      {value:'reading',label:"Reading"},
      {value:'coding',label:"Coding"},
      {value:'baseketball',label:"Coding"},
      {value:'knitting', label:"Knitting"},
      {value:'race car rriving', label:"Race Car Driving"},
    ]

      return (
    <View>
        {/* <SelectList
        setSelected={(val) => setSelected(val)}
        data ={Mydata}
        save='value'
        /> */}
        <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={myData}
        label="Hobbies"
        save='key'
        onSelect={() => console.log(selected)}
        notFoundText='Search for a hobbie'
        />
    

         <MyButton
        title={"Go to create Screen"}
        color={"black"}
        onPress={() => navigation.navigate("Create Account")}
        />
    </View>
  )
}

const styles = StyleSheet.create({})