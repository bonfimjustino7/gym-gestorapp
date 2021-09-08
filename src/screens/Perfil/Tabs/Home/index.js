import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import Card from '../../../../components/Card';
import Icon from '../../../../components/Icon';
import Loading from '../../../../components/Loading';
import {useAuth} from '../../../../context/auth';
import {BASE_API} from '../../../../services/api';
import FormAcademia from './form';

export default function Home({route}) {
  const [modeEdit, setMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [iconName, setIconName] = useState('border-color');

  const {auth} = useAuth();

  const {dados, navigation} = route;

  async function atualizarDados(values) {
    setLoading(true);
    try {
      await BASE_API.put(
        `/academia/${auth.user_id}/`,
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
          <FormAcademia
            readonly={!modeEdit}
            initial={{...dados}}
            editable
            labelButton="Editar"
            onSubmit={async (values, form) => {
              const error = await atualizarDados(values);
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
