import React from 'react';
import {View, Text} from 'react-native';
import Card from '../../../../components/Card';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from '../../../../components/Icon';
import {useState} from 'react';
import FormAluno from '../../AlunoForm/formAluno';
import {BASE_API} from '../../../../services/api';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../../context/auth';
import Loading from '../../../../components/Loading';

export default function Home({route}) {
  const [modeEdit, setMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [iconName, setIconName] = useState('border-color');
  const {dadosAluno, navigation} = route;

  const {auth} = useAuth();

  async function cadastrarAluno(values) {
    setLoading(true);
    try {
      await BASE_API.put(
        `/aluno/${dadosAluno.id}/`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Token ${auth?.token}`,
          },
        },
      );
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
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Dados pessoais
          </Text>
          <Icon
            name={iconName}
            color="#828282"
            onPress={() => {
              setMode(!modeEdit);
              if (!modeEdit) {
                setIconName('eye');
              } else {
                setIconName('border-color');
              }
            }}
          />
        </View>
        {isLoading && <Loading transparent />}
        <Card
          style={{
            flex: 1,
            padding: 20,
            alignItems: 'stretch',
          }}>
          <FormAluno
            readonly={!modeEdit}
            initial={{...dadosAluno}}
            editable
            labelButton="Editar"
            onSubmit={async (values, form) => {
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
                navigation.goBack();
              }
            }}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
