import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/core';

import {RefreshControl, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../../context/auth';
import {BASE_API} from '../../services/api';
import {Container, ContainerCard} from './styles';
import Toast from 'react-native-toast-message';
import Card from '../../components/Card';
import AlunosSVG from '../../assets/alunos.svg';
import FinanceiroSVG from '../../assets/financeiro.svg';
import FeedSVG from '../../assets/feed.svg';
import TreinoSVG from '../../assets/treino.svg';
import PerfilSVG from '../../assets/perfil.svg';
import QRCodeSVG from '../../assets/qrcode.svg';
import Chart from '../../components/Chart';
import {useCallback} from 'react';

export default function Home({navigation}) {
  const {auth, logout} = useAuth();

  const [alunos, setAlunos] = useState({
    alunosAtivos: 0,
    alunosInativos: 0,
  });

  const [isLoading, setLoading] = useState(false);

  async function getAlunos() {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      Toast.show({
        text1: 'Falha na conexão',
        text2: 'Verifique a conexão com a internet',
        type: 'error',
        position: 'bottom',
      });
      setLoading(false);
      logout();
    }
  }
  useFocusEffect(
    useCallback(() => {
      getAlunos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  const dataChart = [
    {
      label: 'Ativos',
      value: alunos.alunosAtivos,
      color: '#69BB4C',
    },
    {
      label: 'Inativos',
      value: alunos.alunosInativos,
      color: '#B14046',
    },
  ];

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              getAlunos();
            }}
          />
        }>
        <LinearGradient
          colors={['#257AC9', '#222426']}
          style={{
            height: 100,
            position: 'relative',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Chart data={dataChart} label="Alunos" />
        </LinearGradient>
        <ContainerCard>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            label="Aluno"
            onPress={() => navigation.navigate('AlunoList')}>
            <AlunosSVG />
          </Card>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            onPress={() => console.log('Aluno')}
            label="Financeiro">
            <FinanceiroSVG />
          </Card>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            label="Feed"
            onPress={() => console.log('Aluno')}>
            <FeedSVG />
          </Card>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            label="Treino"
            onPress={() => console.log('Aluno')}>
            <TreinoSVG />
          </Card>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            label="Perfil"
            onPress={() => navigation.navigate('Perfil')}>
            <PerfilSVG />
          </Card>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            label="QRCode"
            onPress={() => console.log('Aluno')}>
            <QRCodeSVG />
          </Card>
        </ContainerCard>
      </ScrollView>
    </Container>
  );
}
