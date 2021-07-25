import React from 'react';
import Home from './screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DrawerScreens(params) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
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
      {/* <Drawer.Screen name="Home" component={RootStack} /> */}
      <Stack.Screen name="Inicial" component={Home} />
    </Stack.Navigator>
  );
}
