import React from 'react'
import { View, Text ,TextInput} from 'react-native'

export default function TextInputComponent(props) {
    //console.log("prosp",props)
  return (
    <View style={props.viewStyle}>
        <Text style={props.textStyle}>First Name</Text>
            <TextInput
            style={props.textInputStyle}
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder="Enter First Name"
            maxLength={100}
            keyboardType='default'
            />
    </View>
  )
}
