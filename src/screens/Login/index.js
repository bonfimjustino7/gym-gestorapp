import React, {useState} from 'react';
import * as Yup from 'yup';
import {ScrollView, Text, View} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

import {Container, Overlay} from './styles';

import Logo from '../../assets/GYM.svg';
import {Formik} from 'formik';
import {Auth} from '../../services/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

export default function Login({navigation}) {
  const [buttonLogin, setLoading] = useState(false);

  const validate = Yup.object({
    email: Yup.string()
      .email('Email inválido')
      .required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório'),
  });

  return (
    <Container source={require('../../assets/back_login.png')}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Logo />
      </View>
      <View
        style={{
          height: 320,
        }}>
        <ScrollView>
          <Formik
            validationSchema={validate}
            onSubmit={async (values, form) => {
              setLoading(true);
              const res = await Auth(values);
              if (res === 'OK') {
                setLoading(false);
                navigation.navigate('HomeDrawer');
              } else if (res === 'ERROR_SENHA') {
                form.setFieldError('password', 'Email ou senha incorreto');
              }
              setLoading(false);
            }}
            initialValues={{
              email: '',
              password: '',
            }}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <View
                style={{
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 40,
                  zIndex: 2,
                }}>
                <Input
                  value={values.email}
                  label="Email"
                  onChange={handleChange('email')}
                />
                <Input
                  value={values.password}
                  password
                  label="Senha"
                  onChange={handleChange('password')}
                />
                {touched.password && errors.password ? (
                  <Text style={{color: 'red', fontSize: 10}}>
                    Email e/ou senha inválidos
                  </Text>
                ) : null}
                <Button
                  label="Entrar"
                  onPress={handleSubmit}
                  loading={buttonLogin}
                />
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
            )}
          </Formik>
          <Overlay />
        </ScrollView>
      </View>
    </Container>
  );
}
