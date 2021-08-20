/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Card from '../../../components/Card';
import Topic from '../../../components/Topic';
import Input from '../../../components/Input';
import {useAuth} from '../../../context/auth';
import Toast from 'react-native-toast-message';
import {BASE_API} from '../../../services/api';
import {Animated} from 'react-native';
import {useRef} from 'react';
import Loading from '../../../components/Loading';

export default function AlunoDetail({navigation, route}) {
  const [dadosAluno, setDadosAluno] = useState({});
  const [loading, setLoading] = useState(true);
  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const {auth, logout} = useAuth();

  async function getDadosAluno() {
    setLoading(true);
    try {
      const resposta = await BASE_API.get(`/aluno/${route.params.id}/`, {
        headers: {
          Authorization: `Token ${auth?.token}`,
        },
      });

      setDadosAluno(resposta.data);
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

  useEffect(() => {
    getDadosAluno();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
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
        <View style={{paddingHorizontal: 15}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              paddingTop: 20,
            }}>
            Dados pessoais
          </Text>
          {loading ? (
            <Loading />
          ) : (
            <Card
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                }}>
                <Input
                  readonly
                  colorLabel="#257AC9"
                  value={dadosAluno?.nome}
                  label="Nome do Aluno"
                  // onChange={handleChange('nome')}
                />
                <Input
                  readonly
                  colorLabel="#257AC9"
                  value={dadosAluno?.cpf}
                  label="CPF"
                  // onChange={handleChange('nome')}
                />
                <Input
                  readonly
                  colorLabel="#257AC9"
                  value={dadosAluno?.telefone}
                  label="Telefone"
                  // onChange={handleChange('nome')}
                />
                <Input
                  readonly
                  colorLabel="#257AC9"
                  value={dadosAluno?.email}
                  label="Email"
                  // onChange={handleChange('nome')}
                />
                <Input
                  readonly
                  colorLabel="#257AC9"
                  value={dadosAluno?.endereco}
                  label="Endereço"
                  // onChange={handleChange('nome')}
                />
              </View>
            </Card>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
