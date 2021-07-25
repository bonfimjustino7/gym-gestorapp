import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerScreens from './drawer';
import Perfil from './screens/Perfil';
import Home from './screens/Home';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const InitialStack = createStackNavigator();
const PerfilStack = createStackNavigator();

function InitialStackScreen() {
  return (
    <InitialStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerStyle: {backgroundColor: '#257AC9'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={30}
              color="#fff"
              onPress={() => navigation.openDrawer()}
              style={{paddingLeft: 10}}
            />
          ),
        };
      }}>
      <InitialStack.Screen name="Inicial" component={Home} />
    </InitialStack.Navigator>
  );
}

function PerfilStackScreen() {
  return (
    <PerfilStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerStyle: {backgroundColor: '#257AC9'},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={30}
              color="#fff"
              onPress={() => navigation.openDrawer()}
              style={{paddingLeft: 10}}
            />
          ),
        };
      }}>
      <PerfilStack.Screen name="Perfil" component={Perfil} />
    </PerfilStack.Navigator>
  );
}

export default function RouterDrawer({navigation}) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicial" component={InitialStackScreen} />
      <Drawer.Screen name="Perfil" component={PerfilStackScreen} />
    </Drawer.Navigator>
  );
}
