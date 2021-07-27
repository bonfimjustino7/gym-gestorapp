import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import Login from './screens/Login';
import {getData} from './services/store';
import RouterDrawer from './routes.drawer';
import {useAuth} from './context/auth';
import {useState} from 'react';
import SplashScreen from './screens/Splash';

const Stack = createStackNavigator();

export default function RootStack({navigation}) {
  const {setAuth} = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getData('@user');
      console.log(userData);
      if (userData !== null) {
        setUser(userData);
        setAuth(userData);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  // if (user !== null) {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="HomeDrawer"
  //         component={RouterDrawer}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="Login"
  //         component={Login}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   );
  // }

  return (
    <Stack.Navigator
      initialRouteName={user !== null ? 'HomeDrawer' : 'Login'}
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
