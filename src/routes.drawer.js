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
import {Alert, View} from 'react-native';
import {useAuth} from './context/auth';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from './components/Icon';
import AlunoLists from './screens/Aluno/AlunoLists';
import AlunoForm from './screens/Aluno/AlunoForm';

const InitialStack = createStackNavigator();
const PerfilStack = createStackNavigator();

function InitialStackScreen({navigation, route}) {
  function isScreenPrimary(routes) {
    const screenName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    return screenName === 'Home';
  }

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
          headerLeft: ({onPress}) =>
            isScreenPrimary() ? (
              <Icon
                name="menu"
                onPress={() => navigation.openDrawer()}
                style={{paddingLeft: 10}}
              />
            ) : (
              <Icon
                name="keyboard-backspace"
                onPress={onPress}
                style={{paddingLeft: 10}}
              />
            ),
          headerRight: () =>
            isScreenPrimary() && (
              <Icon
                name="help-circle-outline"
                onPress={() => Alert.alert('Ajuda', 'Em desenvolvimento...')}
              />
            ),
        };
      }}>
      <InitialStack.Screen name="Home" component={Home} />
      <InitialStack.Screen
        name="AlunoList"
        component={AlunoLists}
        options={{title: 'Alunos'}}
      />
      <InitialStack.Screen
        name="AlunoForm"
        component={AlunoForm}
        options={{title: 'Cadastro de Alunos'}}
      />
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
            <Icon
              name="menu"
              size={30}
              onPress={() => navigation.openDrawer()}
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
