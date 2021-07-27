import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
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
import {PieChart} from 'react-native-svg-charts';

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
        Toast.show({
          text1: 'Falha na conexão',
          text2: 'Verifique a conexão com a internet',
          type: 'error',
          position: 'bottom',
        });
      }
    }

    getAlunos();
  }, [auth]);

  const pieData = Object.keys(alunos).map((key, index) => ({
    value: alunos[key],
    svg: {
      fill: key === 'alunosAtivos' ? '#69BB4C' : '#B14046',
      onPress: () => console.log('press', index),
    },
    key: `pie-${index}`,
  }));

  return (
    <Container>
      <ScrollView>
        <LinearGradient
          colors={['#257AC9', '#222426']}
          style={{
            height: 100,
            position: 'relative',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              width: '80%',
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Alunos
          </Text>
          <Card
            width={'80%'}
            height={'180%'}
            style={{
              top: 20,
              position: 'absolute',
            }}>
            <PieChart
              animate
              outerRadius={40}
              innerRadius={30}
              style={{height: 200, width: 200}}
              data={pieData}
            />
          </Card>
        </LinearGradient>
        <ContainerCard>
          <Card
            width={'130px'}
            height={'130px'}
            elevation={6}
            label="Aluno"
            onPress={() => console.log('Aluno')}>
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
            onPress={() => console.log('Aluno')}>
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
