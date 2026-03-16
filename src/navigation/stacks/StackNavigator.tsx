import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeController from '@modules/dashboard/HomeController';
import TemporaryDashboard from '@modules/dashboard/temporarydashboard/TemporaryDashboard';
import AddVehicle from '@modules/vehicles/AddVehicle';
import ValidateVehicles from '@modules/vehicles/ValidateVehicles';
import VerifiedVehicles from '@modules/vehicles/VerifiedVehicles';
import Bankdetails from '@modules/payment/Bankdetails';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeController" component={HomeController} />

      <Stack.Screen name="TemporaryDashboard" component={TemporaryDashboard} />

      <Stack.Screen name="VehicleScreen" component={AddVehicle} />
      <Stack.Screen name="ValidateVehicles" component={ValidateVehicles} />
      <Stack.Screen name="VerifiedVehicles" component={VerifiedVehicles} />
      <Stack.Screen name="AddBankdetails" component={Bankdetails} />
    </Stack.Navigator>
  );
}
