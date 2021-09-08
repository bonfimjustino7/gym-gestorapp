/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useAuth} from '../../context/auth';
import Toast from 'react-native-toast-message';
import {BASE_API} from '../../services/api';
import {Animated} from 'react-native';
import {useRef} from 'react';
import Loading from '../../components/Loading';
// import Tabs from '../Tabs';
import {useCallback} from 'react';

import {useFocusEffect} from '@react-navigation/core';
import {initials} from '../../utils/text';
import Tabs from './Tabs';

export default function Perfil({navigation, route}) {
  const [dados, setDados] = useState({});
  const [loading, setLoading] = useState(true);

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const {auth, logout} = useAuth();

  async function getDados() {
    setLoading(true);
    try {
      const resposta = await BASE_API.get(`/academia/${auth.user_id}/`, {
        headers: {
          Authorization: `Token ${auth?.token}`,
        },
      });
      setDados(resposta.data);
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
      getDados();
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
          source={require('../../assets/header_aluno.jpg')}>
          <View
            style={{
              position: 'absolute',
              bottom: -50,
              left: 15,
              width: 130,
              height: 130,
              backgroundColor: '#257AC9',
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#14497D',
              borderWidth: 5,
              zIndex: 1000,
            }}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}>
              {initials(auth?.nome)}
            </Text>
          </View>
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
              width: '65%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'left',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {auth.nome}
            </Text>
          </View>
        </View>
        {loading ? <Loading /> : <Tabs navigation={navigation} dados={dados} />}
      </ScrollView>
    </View>
  );
}
