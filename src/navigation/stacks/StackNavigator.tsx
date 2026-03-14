import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeController from '@modules/dashboard/HomeController';
import TemporaryDashboard from '@modules/dashboard/temporarydashboard/TemporaryDashboard';
import AddVehicle from '@modules/vehicles/AddVehicle';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeController" component={HomeController} />

      <Stack.Screen name="TemporaryDashboard" component={TemporaryDashboard} />

      <Stack.Screen name="VehicleScreen" component={AddVehicle} />
    </Stack.Navigator>
  );
}
