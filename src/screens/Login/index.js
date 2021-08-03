import React, {useState} from 'react';
import * as Yup from 'yup';
import {ScrollView, Text, View} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

import {Container, Overlay} from './styles';

import Logo from '../../assets/GYM.svg';
import {Formik} from 'formik';

import Toast from 'react-native-toast-message';
import {BASE_API} from '../../services/api';
import {useAuth} from '../../context/auth';

export default function Login({navigation}) {
  const [buttonLogin, setLoading] = useState(false);
  const {login} = useAuth();

  async function loginHandler(dataValues) {
    try {
      const responseData = await BASE_API.post('/auth/', dataValues);
      const {data} = responseData;

      if (data.is_academia) {
        login(data);
      } else {
        console.log(data);
        return 'ERROR_CONTA';
      }
    } catch ({response}) {
      if (response?.status === 400) {
        return 'ERROR_SENHA';
      } else {
        Toast.show({
          text1: 'Não foi possivel realizar a requisição',
          text2: response,
          type: 'error',
          position: 'bottom',
        });
        return null;
      }
    }
  }

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
      <View>
        <ScrollView>
          <Formik
            validationSchema={validate}
            onSubmit={async (values, form) => {
              setLoading(true);
              const res = await loginHandler(values);
              if (res === 'ERROR_SENHA') {
                form.setFieldError('password', 'Email ou senha incorreto');
              } else if (res === 'ERROR_CONTA') {
                form.setFieldError(
                  'password',
                  'Não existe nenhuma academia com esta crendecial',
                );
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
                    {errors.password}
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
