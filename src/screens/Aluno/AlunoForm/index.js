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

export default function AlunoForm({navigation}) {
  const [isLoading, setLoading] = useState(false);
  const [dataAluno, setDataAluno] = useState(null);
  const [formActive, setFormActive] = useState(null);

  const {auth} = useAuth();

  async function cadastrarAluno() {
    try {
      const {data} = await BASE_API.post('/aluno/', {
        ...dataAluno,
        academia: auth.user_id,
      });
      return {user_id: data.user_id};
    } catch ({response}) {
      console.log(response?.data);
      if (response && Object.keys(response?.data).length > 0) {
        setFormActive('aluno');
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

  async function cadastrarMedicoes(alunoId, valuesMedicoes) {
    try {
      await BASE_API.post(
        `/aluno/${alunoId}/medicoes/`,
        {aluno: alunoId, ...valuesMedicoes},
        {
          headers: {
            Authorization: `Token ${auth?.token}`,
          },
        },
      );
    } catch ({response}) {
      console.log(response?.data);
      if (response) {
        return response.data;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar aluno',
          position: 'bottom',
        });
        return null;
      }
    }
  }

  async function cadastrar(valuesMedicoes) {
    const data = await cadastrarAluno();

    if (data?.user_id) {
      await cadastrarMedicoes(data.user_id, valuesMedicoes);
      navigation.goBack();
    } else {
      let erros = '';
      Object.keys(data).forEach(key => {
        erros += data[key]?.toString() + '\n';
      });
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: erros,
        position: 'bottom',
        visibilityTime: 10000,
      });
    }
  }

  return (
    <Container>
      <ScrollView>
        <Header style={{marginVertical: 20}}>
          <Label text="Bem vindo ao app!" />
          <Label text="Cadastre os dados do aluno abaixo e aproveite!" />
        </Header>
        {formActive === 'aluno' || !formActive ? (
          <FormAluno
            initial={{...dataAluno}}
            labelButton="Proximo"
            onSubmit={values => {
              setDataAluno(values);
              console.log(values);
              setFormActive('medicoes');
            }}
          />
        ) : (
          <FormMedicoes
            onPressBack={() => setFormActive('aluno')}
            onSubmit={values => {
              cadastrar(values);
            }}
          />
        )}
      </ScrollView>
    </Container>
  );
}
