import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../../context/auth';
import {BASE_API} from '../../services/api';
import {Container} from './styles';

export default function Home({navigation}) {
  const {auth} = useAuth();

  const [alunos, setAlunos] = useState({
    alunosAtivos: 0,
    alunosInativos: 0,
  });

  useEffect(() => {
    async function getAlunos() {
      try {
        const resposta = await BASE_API.get(
          `/academia/${auth?.user_id}/estatisticas/`,
          {
            headers: {
              Authorization: `Token ${auth?.token}`,
            },
          },
        );

        setAlunos({
          alunosAtivos: resposta.data.alunos_ativos,
          alunosInativos: resposta.data.alunos_inativos,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getAlunos();
  }, [auth]);

  return (
    <Container>
      <LinearGradient
        colors={['#257AC9', '#222426']}
        style={{height: 100, margin: 0}}
      />
      <Text>{`Bem vindo ${auth?.nome}`}</Text>
      <Text>{`Alunos ativos ${alunos.alunosAtivos}`}</Text>
      <Text>{`Alunos Inativos ${alunos.alunosInativos}`}</Text>
    </Container>
  );
}
