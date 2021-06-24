import React from 'react';
import {View} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

import {Container, Overlay} from './styles';

import Logo from '../../assets/GYM.svg';

export default function Login({navigation}) {
  return (
    <Container source={require('../../assets/back_login.png')}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Logo />
      </View>
      <View
        style={{
          height: 320,
        }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 15,
            paddingHorizontal: 40,
            zIndex: 2,
          }}>
          <Input label="Email" onChange={value => console.log(value)} />
          <Input
            password
            label="Senha"
            onChange={value => console.log(value)}
          />
          <Button label="Entrar" onPress={() => console.log('clicou')} />
          <Button
            transparent
            label="Criar Conta"
            onPress={() => navigation.navigate('SignIn')}
          />
          <Link
            onPress={() => console.log('Esqueci a senha')}
            text="Esqueci minha senha"
          />
        </View>
        <Overlay />
      </View>
    </Container>
  );
}
