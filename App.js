import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RouterContainer from './src/routes';

export default function App() {
  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <RouterContainer />
    </NavigationContainer>
  );
}
