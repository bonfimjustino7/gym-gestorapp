import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './screens/Home';

export default function RouterDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
