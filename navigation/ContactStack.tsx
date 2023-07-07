import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ContactDetails from '../Screens/ContactDetails';
import Contact from '../Screens/Contact';

const ContactStack = () => {
const Stack = createNativeStackNavigator();


    
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarStyle: { display: 'none' },
      }}>

        <Stack.Screen name="contact" component={Contact} />
      </Stack.Navigator>
    
  )
}

export default ContactStack
