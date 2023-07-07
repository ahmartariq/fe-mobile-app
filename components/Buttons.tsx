import React from 'react'
import {Text, TouchableOpacity,} from 'react-native'

export const PrimaryButtons = ({text, onPress} : {text: string, onPress: () => void}) => {
  return (
    <TouchableOpacity
    style={{ backgroundColor: '#4675F7', height: 54, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
    onPress={onPress}
    accessibilityLabel="Learn more about this purple button">
    <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>{text}</Text>
  </TouchableOpacity>
  )
}
