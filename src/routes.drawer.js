import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Perfil from './screens/Perfil';
import Home from './screens/Home';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert, View} from 'react-native';
import {useAuth} from './context/auth';

const InitialStack = createStackNavigator();
const PerfilStack = createStackNavigator();

function InitialStackScreen() {
  return (
    <InitialStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerStyle: {
            backgroundColor: '#257AC9',
            elevation: 0,
            shadowOpacity: 0,
          },
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
          headerRight: () => (
            <MaterialIcons
              name="help-circle-outline"
              size={30}
              color="#fff"
              onPress={() => Alert.alert('Ajuda', 'Em desenvolvimento...')}
              style={{paddingRight: 10}}
            />
          ),
        };
      }}>
      <InitialStack.Screen name="Home" component={Home} />
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

function CustomDrawerContent(props) {
  const {logout} = useAuth();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <DrawerItemList {...props} />
      </View>
      <View>
        <DrawerItem
          label="Sair"
          onPress={() => {
            Alert.alert('Sair', 'Sessão encerrada');
            logout();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function RouterDrawer({navigation}) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Inicial" component={InitialStackScreen} />
      <Drawer.Screen name="Perfil" component={PerfilStackScreen} />
    </Drawer.Navigator>
  );
}
