import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from '@navigation/tabs/BottomTabs';
// import BottomTabs from '../tabs/BottomTabs';
// import Settings from '@modules/dashboard/Settings';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Dashboard" component={BottomTabs} />
      {/* <Drawer.Screen name="Settings" component={Settings} /> */}
    </Drawer.Navigator>
  );
}
