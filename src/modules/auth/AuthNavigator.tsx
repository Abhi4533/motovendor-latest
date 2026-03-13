import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from './Splashscreen';
import Login from './Login';
import Signup from './Signup';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splashscreen" component={Splashscreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
