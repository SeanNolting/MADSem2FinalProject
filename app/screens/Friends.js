import { FlatList, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import colors from '../config/colors';
import MyButton from '../components/MyButton';
import { IconButton } from 'react-native-paper';

export default function Friends() {
  const dummyData = [
    {
      id: 1,
      name: "Bill",
      major:"Finance",
      image: require('../../images/Gatorade.png')
    },
    {
      id: 2,
      name: "Joe",
      major:"Chemistry",
      image: require('../../images/Gatorade.png')
    },
    {
      id: 3,
      name: "Bob",
      major: "Law",
      image: require('../../images/Gatorade.png')
    },
    {
      id: 4,
      name: "Anna",
      major: "Math",
      image: require('../../images/Gatorade.png')
    },
  ];

  const onePerson = ({item}) =>
  (
    <View style={styles.friendContainer}>
      <View>
        <Image source = {item.image} style = {styles.image}/>
        </View>
      <View>
        <Text style ={styles.friendName}>{item.name}</Text>
        <Text style ={styles.friendMajor}>{item.major}</Text>
     </View>
     <View>
      <IconButton 
      icon="star"
      iconColor='black'
      size={20}
      onPress={() => console.log("Added to favorites")}
      />
     </View>
    </View>
  )

  const headerComponent = () =>
  {
    return <Text style={styles.listHeaderTextStyle}>Friends</Text>
  }

  const itemSeperator = () =>
  {
    return <View style = {styles.itemSperatorStyle}/>
  }

  return (
    <SafeAreaView>
      <FlatList 
      ListHeaderComponentStyle={styles.listHeaderStyle}
      ListHeaderComponent={headerComponent}
      data={dummyData}
      renderItem={onePerson}
      ItemSeparatorComponent={itemSeperator}
      ListEmptyComponent={<Text> Add freinds to see them here </Text>}
      />
      <MyButton title={"Go to favorites"} color={"black"}/>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  
  listHeaderStyle:
  {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeaderTextStyle:
  {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemSperatorStyle:
  {
    height: 1,
    width: "100%",
    backgroundColor: colors.mintGreen,
  },
  image:
  {
    height: 75,
    width: 75,  
    borderRadius: 35,
    borderWidth: 2,
    marginTop: 20,
  },
  friendName:
  {
    marginLeft: 15,
    fontSize: 18,
    marginTop: 20,
  },
  friendMajor:
  {
    marginLeft: 15,
    fontSize: 18, 
    marginTop: 5,
  },
  friendContainer:
  {
    marginLeft: 5,
    alignItems: "center",
    flexDirection:"row"
  },

})