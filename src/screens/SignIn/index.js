import React from 'react';
import * as Yup from 'yup';

import {useState} from 'react';
import {Formik} from 'formik';

import {Container, Header} from './styles';
import {ScrollView, View} from 'react-native';

import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {cadastrarAcademia} from '../../services/academia';

export default function SignIn({navigation}) {
  const [isLoading, setLoading] = useState(false);

  const validate = Yup.object({
    nome: Yup.string().required('Este campo é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório'),
    endereco: Yup.string().required('Este campo é obrigatório'),
    telefone: Yup.string().required('Este campo é obrigatório').max(11),
    cnpj: Yup.string().required('Este campo é obrigatório').max(14),
  });

  return (
    <ScrollView>
      <Container>
        <Header>
          <Label text="Bem vindo ao app!" />
          <Label text="Cadastre seus dados abaixo e aproveite!" />
        </Header>
        <Formik
          validationSchema={validate}
          onSubmit={async (values, form) => {
            setLoading(true);
            const res = await cadastrarAcademia(values);
            if (res === 'OK') {
              setLoading(false);
              navigation.navigate('HomeDrawer');
            } else if (Object.keys(res).length > 0) {
              Object.keys(res).forEach(keyError => {
                form.setFieldError(keyError, res[keyError]);
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
                onChange={handleChange('cnpj')}
              />
              <Input
                keyboardType="numeric"
                value={values.telefone}
                error={touched.telefone && errors.telefone}
                label="Telefone"
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
      </Container>
    </ScrollView>
  );
}
