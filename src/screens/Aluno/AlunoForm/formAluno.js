import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default function FormAluno({
  labelButton,
  onSubmit,
  initial,
  readonly,
  editable,
}) {
  const fields = {
    nome: Yup.string().required('Este campo é obrigatório'),
    email: Yup.string()

      .email('Email inválido')
      .required('Este campo é obrigatório'),

    endereco: Yup.string().required('Este campo é obrigatório'),
    telefone: Yup.string().nullable().max(20).min(18),
    cpf: Yup.string().nullable().max(14).min(14),
  };

  const validate = Yup.object(
    !editable
      ? {
          password: Yup.string().required('Este campo é obrigatório'),
          ...fields,
        }
      : fields,
  );

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
            readonly={readonly}
            value={values.nome}
            error={touched.nome && errors.nome}
            label="Nome do Aluno"
            onChange={handleChange('nome')}
          />
          <Input
            readonly={readonly}
            keyboardType="numeric"
            value={values.cpf}
            error={touched.cpf && errors.cpf}
            label="CPF"
            typeMask="cpf"
            size={14}
            onChange={handleChange('cpf')}
          />
          <Input
            readonly={readonly}
            keyboardType="numeric"
            value={values.telefone}
            error={touched.telefone && errors.telefone}
            typeMask="phone"
            label="Telefone"
            size={18}
            onChange={handleChange('telefone')}
          />
          <Input
            readonly={readonly}
            value={values.endereco}
            error={touched.endereco && errors.endereco}
            label="Endereço"
            onChange={handleChange('endereco')}
          />
          <Input
            readonly={readonly}
            error={touched.email && errors.email}
            value={values.email}
            label="Email"
            onChange={handleChange('email')}
          />
          {!editable && (
            <Input
              readonly={readonly}
              error={touched.password && errors.password}
              password
              label="Senha"
              onChange={handleChange('password')}
            />
          )}

          {!readonly && (
            <Button
              style={{marginVertical: 20}}
              label={labelButton}
              onPress={handleSubmit}
            />
          )}
        </View>
      )}
    </Formik>
  );
}
