import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Login from './screens/Login';
import {getData} from './services/store';
import RouterDrawer from './routes.drawer';

export default function RootStack({navigation}) {
  const Stack = createStackNavigator();

  useEffect(() => {
    const getUser = async () => {
      const userData = await getData('@user');
      console.log(userData);
    };
    getUser();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {backgroundColor: '#257AC9'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Cadastro',
        }}
      />
      <Stack.Screen
        name="HomeDrawer"
        component={RouterDrawer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
