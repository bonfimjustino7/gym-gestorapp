import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import RootStack from './src/routes';
import AuthProvider from './src/context/auth';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="#164878" />
        <AuthProvider>
          <RootStack />
        </AuthProvider>
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </>
  );
}
