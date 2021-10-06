import React from 'react'
import { View, Text ,Dimensions, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ProductsList } from './Home';
import { Cart } from './Cart';
import Test2 from './Test2';
// import { useNavigation } from '@react-navigation/core';
const  {width, height} = Dimensions.get('screen');

const Data =[{name:'Home',icon:'md-home-outline',screen:"ProductList"},{screen:"Explore",icon:'md-compass-outline',name:'Explore'},{name:'Cart',icon:'md-cart-outline',screen:'Cart'},{name:'Settings',icon:'md-settings-outline',screen:'Settings'}]
//  const navigation = useNavigation;
export default function Test({navigation}) {
  return (
    <View style={{ alignItems:'center',backgroundColor:'white',
      width:width,height:60,justifyContent:'space-around',flexDirection:'row',position:'absolute',bottom:0}}>
      {Data.map((item, index)=>(
        <TouchableOpacity 
        onPress={() => {
          navigation.navigate("Test2")}}
            
          
        >
          <View style={{alignItems:'center',justifyContent:'center',}} key={index}>
        <Ionicons name={item.icon} size={24} color="black" />
        <Text>{item.name}</Text>
        </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
