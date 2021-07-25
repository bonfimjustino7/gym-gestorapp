import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import RootStack from './src/routes';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="#164878" />
        <RootStack />
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </>
  );
}
