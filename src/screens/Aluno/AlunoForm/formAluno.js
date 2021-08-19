import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default function FormAluno({labelButton, onSubmit, initial}) {
  const validate = Yup.object({
    nome: Yup.string().required('Este campo é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Este campo é obrigatório'),
    password: Yup.string().required('Este campo é obrigatório'),
    endereco: Yup.string().required('Este campo é obrigatório'),
    telefone: Yup.string().required('Este campo é obrigatório').max(20).min(18),
    cpf: Yup.string().required('Este campo é obrigatório').max(14).min(14),
  });
  return (
    <Formik
      validationSchema={validate}
      onSubmit={(values, form) => {
        // setLoading(true);
        // const error = await cadastrarAluno(values);
        // if (error && Object.keys(error).length > 0) {
        //   Object.keys(error).forEach(keyError => {
        //     form.setFieldError(keyError, error[keyError]);
        //   });
        // }
        // setLoading(false);
        onSubmit(values, form);
      }}
      initialValues={{
        nome: '',
        email: '',
        password: '',
        endereco: '',
        telefone: '',
        cpf: '',
        ...initial,
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View>
          <Input
            value={values.nome}
            error={touched.nome && errors.nome}
            label="Nome do Aluno"
            onChange={handleChange('nome')}
          />
          <Input
            keyboardType="numeric"
            value={values.cpf}
            error={touched.cpf && errors.cpf}
            label="CPF"
            typeMask="cpf"
            size={14}
            onChange={handleChange('cpf')}
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
            style={{marginVertical: 20}}
            label={labelButton}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
}
