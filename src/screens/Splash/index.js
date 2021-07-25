import React from 'react';
import {View, Text, Image} from 'react-native';
import {Column, Container} from './styles';
import {TextPrimary} from './styles';

export default function SplashScreen() {
  return (
    <Container>
      <Column>
        <TextPrimary>GYM</TextPrimary>
      </Column>
      <Column>
        <Image source={require('../../assets/folder.png')} />
      </Column>
    </Container>
  );
}
