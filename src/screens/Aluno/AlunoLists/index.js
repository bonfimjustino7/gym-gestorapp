import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';
import {Container} from './styles';
import Card from '../../../components/Card';
import Icon from '../../../components/Icon';
import Link from '../../../components/Link';
import {useState} from 'react';
import {useAuth} from '../../../context/auth';
import {BASE_API} from '../../../services/api';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import Collapsible from 'react-native-collapsible';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default function AlunoLists({navigation}) {
  const {auth, logout} = useAuth();
  const [matriculas, setMatriculas] = useState([]);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isCollapsible, setCollapsible] = useState(true);
  const [status, setStatus] = useState('');

  async function getMatriculas() {
    setLoading(true);
    try {
      const resposta = await BASE_API.get(
        `/matricula/?search=${search}&status=${status}`,
        {
          headers: {
            Authorization: `Token ${auth?.token}`,
          },
        },
      );

      setMatriculas(resposta.data.results);
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
    getMatriculas();

    if (status === 'A') {
      navigation.setOptions({title: 'Alunos Ativos'});
    } else if (status === 'I') {
      navigation.setOptions({title: 'Alunos Inativos'});
    } else {
      navigation.setOptions({title: 'Alunos'});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            padding: 1,
            backgroundColor: '#fff',
            borderRadius: 8,
            marginVertical: 20,
            marginRight: 10,
            elevation: 6,
            flexDirection: 'row',
          }}>
          <Icon name="magnify" size={25} color="#000" />
          <TextInput
            style={{flex: 1}}
            onChangeText={letra => setSearch(letra)}
          />
        </View>
        <View
          style={{
            flex: 0,
            padding: 2,
            backgroundColor: '#fff',
            borderRadius: 8,
            marginVertical: 20,
            elevation: 6,
          }}>
          <TouchableHighlight
            underlayColor="#CCC"
            onPress={() => setCollapsible(!isCollapsible)}>
            <Icon name="filter-variant" size={25} color="#000" />
          </TouchableHighlight>
        </View>
      </View>
      <Collapsible
        style={{
          alignItems: 'flex-start',
        }}
        collapsed={isCollapsible}>
        <Link text="Alunos Ativos" onPress={() => setStatus('A')} />
        <Link text="Alunos Inativos" onPress={() => setStatus('I')} />
        <Link text="Todos" onPress={() => setStatus('')} />
      </Collapsible>
      {matriculas.length > 0 ? (
        <FlatList
          onRefresh={() => getMatriculas()}
          refreshing={loading}
          data={matriculas}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => {
            return (
              <Card height={'100px'} onPress={() => console.log(item.aluno.id)}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{}}>
                    <View
                      style={{
                        marginHorizontal: 20,
                      }}>
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          borderBottomLeftRadius: 40,
                          borderBottomRightRadius: 40,
                          borderTopLeftRadius: 40,
                          borderTopRightRadius: 40,
                        }}
                        source={require('../../../assets/folder.png')}
                      />
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#fff', fontSize: 16}}>
                      {item.aluno?.nome}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                      }}>
                      Status:{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.status === 'ATIVA' ? '#69BB4C' : '#B14046',
                        }}>
                        {item.status}
                      </Text>
                    </Text>
                  </View>
                </View>
              </Card>
            );
          }}
        />
      ) : (
        !loading && (
          <View style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    getMatriculas();
                  }}
                />
              }>
              <Text style={{fontSize: 18, color: '#fff'}}>
                Nenhum aluno encontrado
              </Text>
            </ScrollView>
          </View>
        )
      )}
    </Container>
  );
}
