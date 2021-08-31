import React from 'react';
import * as Yup from 'yup';

import {useState} from 'react';
import {Formik} from 'formik';

import {Container, Header} from './styles';
import {ScrollView, View} from 'react-native';

import Label from '../../../components/Label';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../context/auth';
import {BASE_API} from '../../../services/api';
import FormAluno from './formAluno';
import {useRef} from 'react';
import FormMedicoes from './formMedicoes';
import Loading from '../../../components/Loading';
import {useEffect} from 'react';

export default function AlunoForm({navigation}) {
  const [isLoading, setLoading] = useState(false);
  const [idAluno, setIdAluno] = useState(null);

  const {auth} = useAuth();

  async function cadastrarAluno(values) {
    setLoading(true);
    try {
      const {data} = await BASE_API.post('/aluno/', {
        ...values,
        academia: auth.user_id,
      });

      setIdAluno(data.user_id);
      setLoading(false);

      return null;
    } catch ({response}) {
      setLoading(false);

      if (response && Object.keys(response?.data).length > 0) {
        return response.data;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar aluno',
          position: 'bottom',
        });
      }

      return null;
    }
  }

  useEffect(() => {
    navigation.navigate('MedicoesForm', {
      aluno_id: idAluno,
      redirect: 'AlunoList',
    });
  }, [idAluno]);

  return (
    <Container>
      <ScrollView>
        <Header style={{marginVertical: 20}}>
          <Label text="Bem vindo ao app!" />
          <Label text="Cadastre os dados do aluno abaixo e aproveite!" />
        </Header>
        {isLoading && <Loading transparent />}
        <FormAluno
          labelButton="Salvar"
          onSubmit={async (values, form) => {
            console.log(values);
            const error = await cadastrarAluno(values);
            if (error) {
              console.log(error);
              Object.keys(error).forEach(keyError => {
                form.setFieldError(keyError, error[keyError]);
              });
            } else {
              Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Dados salvos com sucesso',
                position: 'bottom',
              });
            }
          }}
        />
      </ScrollView>
    </Container>
  );
}
