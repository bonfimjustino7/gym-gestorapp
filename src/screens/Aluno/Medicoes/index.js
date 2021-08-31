import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../context/auth';
import {BASE_API} from '../../../services/api';
import FormMedicoes from '../AlunoForm/formMedicoes';
import {Container} from './styles';
import Loading from '../../../components/Loading';

export default function MedicoesForm({navigation, route}) {
  const {auth} = useAuth();
  const [isLoading, setLoading] = useState(false);

  async function cadastrarMedicoes(alunoId, valuesMedicoes) {
    setLoading(true);
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
      navigation.goBack(null);
    } catch ({response}) {
      console.log(response?.data);
      setLoading(false);
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
  return (
    <Container>
      {isLoading && <Loading transparent />}
      <ScrollView>
        <FormMedicoes
          onSubmit={values => {
            cadastrarMedicoes(route?.params.aluno_id, values);
          }}
        />
      </ScrollView>
    </Container>
  );
}
