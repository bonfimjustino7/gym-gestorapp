/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Card from '../../../components/Card';
import Topic from '../../../components/Topic';
import {useAuth} from '../../../context/auth';
import Toast from 'react-native-toast-message';
import {BASE_API} from '../../../services/api';
import {Animated} from 'react-native';
import {useRef} from 'react';
import Loading from '../../../components/Loading';
import Tabs from '../Tabs';
import {useCallback} from 'react';

import {useFocusEffect} from '@react-navigation/core';

export default function AlunoDetail({navigation, route}) {
  const [dadosAluno, setDadosAluno] = useState({});
  const [medicoesAluno, setMedicoesAluno] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMedicoes, setLoadingMedicoes] = useState(false);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const {auth, logout} = useAuth();

  async function getMedicoes() {
    setLoadingMedicoes(true);

    try {
      const respostaMedicao = await BASE_API.get(
        `/aluno/${route.params.id}/medicoes/`,
        {
          headers: {
            Authorization: `Token ${auth?.token}`,
          },
        },
      );
      setLoadingMedicoes(false);
      setMedicoesAluno(respostaMedicao.data?.results);
    } catch (error) {
      Toast.show({
        text1: 'Falha na conexão',
        text2: 'Verifique a conexão com a internet',
        type: 'error',
        position: 'bottom',
      });
      setLoadingMedicoes(false);
    }
  }

  async function getDadosAluno() {
    setLoading(true);
    try {
      const resposta = await BASE_API.get(`/aluno/${route.params.id}/`, {
        headers: {
          Authorization: `Token ${auth?.token}`,
        },
      });

      setDadosAluno(resposta.data);
      await getMedicoes();
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
      getDadosAluno();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => {
        return (
          <Animated.View
            style={{
              backgroundColor: '#257AC9',
              ...StyleSheet.absoluteFillObject,
              opacity: headerOpacity,
            }}
          />
        );
      },
      headerTransparent: true,
    });
  }, [headerOpacity, navigation]);

  return (
    <View style={{flex: 1, backgroundColor: '#222426'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          style={{height: 200, justifyContent: 'flex-end'}}
          source={require('../../../assets/header_aluno.jpg')}>
          <Card
            style={{
              position: 'absolute',
              bottom: -50,
              left: 15,
            }}
            height={'150px'}
            width={'150px'}>
            <Image
              height={150}
              width={150}
              source={require('../../../assets/foto.png')}
            />
          </Card>
        </ImageBackground>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingLeft: 10,
          }}>
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Topic
              status={route?.params.status}
              style={{marginHorizontal: 8}}
            />
            <Text
              style={{
                color: '#fff',
                textAlign: 'left',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {route?.params.nome}
            </Text>
          </View>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <Tabs
            screenLoading={{medicao: loadingMedicoes}}
            navigation={navigation}
            dadosAluno={dadosAluno}
            medicoesAluno={medicoesAluno}
            nomeAluno={route?.params.nome}
          />
        )}
      </ScrollView>
    </View>
  );
}
