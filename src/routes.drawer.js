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
import {Alert, ImageBackground, Text, View} from 'react-native';
import {useAuth} from './context/auth';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from './components/Icon';
import AlunoLists from './screens/Aluno/AlunoLists';
import AlunoForm from './screens/Aluno/AlunoForm';
import AlunoDetail from './screens/Aluno/AlunoDetail';
import PerfilIcon from '../src/assets/perfil.svg';
import HomeIcon from '../src/assets/home_icon.svg';
import LogoutIcon from '../src/assets/logout.svg';
import {sigle, textTruncate} from './utils/text';

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
      <InitialStack.Screen
        name="AlunoDetail"
        component={AlunoDetail}
        options={{
          title: 'Informações do Aluno',
          headerTransparent: true,
          headerTitleAlign: 'left',
        }}
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
  const {logout, auth} = useAuth();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#222426',
      }}>
      <View>
        <View style={{width: 200, height: 200}}>
          <ImageBackground
            style={{width: 300, height: 200, justifyContent: 'flex-end'}}
            source={require('../src/assets/folder.png')}>
            <View
              style={{
                position: 'absolute',
                top: 50,
                left: 20,
                width: 100,
                height: 100,
                backgroundColor: '#257AC9',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#14497D',
                borderWidth: 5,
                zIndex: 1000,
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>
                {sigle(auth?.nome)}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(42, 43, 44, 0.5)',
                height: 100,
                alignItems: 'flex-end',
              }}>
              <View style={{width: 180, padding: 10}}>
                <Text
                  style={{
                    fontSize: 21,
                    fontWeight: 'bold',
                    color: '#fff',
                    lineHeight: 35,
                  }}>
                  Bem vindo!
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  {textTruncate(auth?.nome, 34)}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <DrawerItemList
          activeTintColor="#fff"
          inactiveTintColor="#fff"
          {...props}
        />
        <DrawerItem
          icon={() => <LogoutIcon width={28} height={28} style={{top: 4}} />}
          activeTintColor="#fff"
          inactiveTintColor="#fff"
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
      <Drawer.Screen
        name="Inicial"
        component={InitialStackScreen}
        options={{
          drawerIcon: () => <HomeIcon width={28} height={28} />,
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilStackScreen}
        options={{
          drawerIcon: () => <PerfilIcon width={28} height={28} />,
        }}
      />
    </Drawer.Navigator>
  );
}
