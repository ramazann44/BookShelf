import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import ResetPassword from '../screens/Auth/ResetPassword'

const Stack = createNativeStackNavigator();

const BottomTabStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='ResetPassword'
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}



const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack