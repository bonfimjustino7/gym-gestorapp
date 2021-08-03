import React from 'react';
import * as Yup from 'yup';

import {useState} from 'react';
import {Formik} from 'formik';

import {Container, Header} from './styles';
import {ScrollView, View} from 'react-native';

import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {BASE_API} from '../../services/api';
import {storeData} from '../../services/store';
import {useAuth} from '../../context/auth';
import Toast from 'react-native-toast-message';

export default function SignIn({navigation}) {
  const [isLoading, setLoading] = useState(false);
  const {setAuth} = useAuth();

  async function cadastrarAcademia(dataValues) {
    try {
      const {data} = await BASE_API.post('/academia/', dataValues);

      await storeData('@user', data);
      setAuth(data);
      navigation.navigate('HomeDrawer');
    } catch ({response}) {
      console.log(response?.data);
      if (response) {
        return response.data;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar academia',
          position: 'bottom',
        });
        return null;
      }
    }
  }

  const validate = Yup.object({
    nome: Yup.string().required('Este campo é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório'),
    endereco: Yup.string().required('Este campo é obrigatório'),
    telefone: Yup.string().required('Este campo é obrigatório').max(19).min(18),
    cnpj: Yup.string().required('Este campo é obrigatório').max(15).min(14),
  });

  return (
    <Container>
      <ScrollView>
        <Header>
          <Label text="Bem vindo ao app!" />
          <Label text="Cadastre seus dados abaixo e aproveite!" />
        </Header>
        <Formik
          validationSchema={validate}
          onSubmit={async (values, form) => {
            setLoading(true);
            const error = await cadastrarAcademia(values);
            if (error && Object.keys(error).length > 0) {
              Object.keys(error).forEach(keyError => {
                form.setFieldError(keyError, error[keyError]);
              });
            }
            setLoading(false);
          }}
          initialValues={{
            nome: '',
            email: '',
            password: '',
            endereco: '',
            telefone: '',
            cnpj: '',
          }}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View>
              <Input
                value={values.nome}
                error={touched.nome && errors.nome}
                label="Nome da Academia"
                onChange={handleChange('nome')}
              />
              <Input
                keyboardType="numeric"
                value={values.cnpj}
                error={touched.cnpj && errors.cnpj}
                label="CNPJ"
                typeMask="cnpj"
                // size={18}
                onChange={handleChange('cnpj')}
              />
              <Input
                keyboardType="numeric"
                value={values.telefone}
                error={touched.telefone && errors.telefone}
                typeMask="phone"
                label="Telefone"
                size={18}
                onChange={handleChange('telefone')}
              />
              <Input
                value={values.endereco}
                error={touched.endereco && errors.endereco}
                label="Endereço"
                onChange={handleChange('endereco')}
              />
              <Input
                error={touched.email && errors.email}
                value={values.email}
                label="Email"
                onChange={handleChange('email')}
              />
              <Input
                error={touched.password && errors.password}
                password
                label="Senha"
                onChange={handleChange('password')}
              />

              <Button
                loading={isLoading}
                label="Cadastrar"
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
}
