import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Login from './screens/Login';

export default function RouterContainer() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
