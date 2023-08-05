import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList,Keyboard } from 'react-native'
import { useSelector } from 'react-redux'
import { actions } from '../Redux/actions/actionIndex'

export default function HomeScreen({ navigation }) {
   const infoData = useSelector((state) => state.infoReducer.infoArray)
   //console.log("info in home screen", infoData)

   useEffect(() => {
      navigation.setOptions({
         headerRight: () => <View style={{ flexDirection: 'row', marginRight: 12 }}>
            <AddEnquiry />
         </View>,
      })
   }, []);

   const AddEnquiry = () => {
      return (
         <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}
               onPress={() => navigation.navigate("InfoFormPage")}
            >
               <Text style={[{ color: '#000000',fontSize:20 }]}>Add</Text>
            </TouchableOpacity>
         </View>
      )
   }

   const onDeleteButtonClick = (item, index) => {
      //console.log("item----", item)
      actions.deteleArray({
         id: item.id
      })
   }

   const renderItem = ({ item, index }) => {
      
      return (
         <TouchableOpacity onPress={() => {navigation.push("InfoFormPage", { isForEdit: true, index: index }),Keyboard.dismiss}} accessible={false}>
            <View style={{ backgroundColor: 'gray', padding: 20, margin: 10, borderRadius: 10, }}>
               <TouchableOpacity style={{ backgroundColor: '#D3D3D3', width: 60, marginBottom: 15, padding: 4, alignItems: 'center', borderRadius: 10 }}
                  onPress={() => onDeleteButtonClick(item)}
               >
                  <Text>Delete</Text>
               </TouchableOpacity>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                     <View style={{ flexDirection: 'row' }}>
                        <Text>Id : </Text>
                        <Text>{index + 1}</Text>
                     </View>
                     <View style={{ flexDirection: 'row' }}>
                        <Text>First Name : </Text>
                        <Text>{item.firstName}</Text>
                     </View>
                     <View style={{ flexDirection: 'row' }}>
                        <Text>Last Name : </Text>
                        <Text>{item.lastName}</Text>
                     </View>
                     <View style={{ flexDirection: 'row' }}>
                        <Text>Date of Birth : </Text>
                        <Text>{item.dateOfBirth}</Text>
                     </View>
                     <View style={{ flexDirection: 'row' }}>
                        <Text>Marital Status : </Text>
                        <Text>{item.marritialStatus}</Text>
                     </View>
                  </View>
                  <View style={styles.profileImg}>
                     <Image source={{ uri: item.photoUrl }}
                        style={styles.profileImg} />
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      )
   }

   return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
         <FlatList
            data={infoData}
            renderItem={(item, index) => renderItem(item, index)}
         />

      </View>
   )
}
const styles = StyleSheet.create({
   profileImg: {
      width: 100,
      height: 100,
      borderRadius: 12,
      borderColor: '#000000',
      borderWidth: 2,
      justifyContent: 'center',
      alignSelf: 'center'
   },
})
