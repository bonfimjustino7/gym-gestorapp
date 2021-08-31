import React from 'react';
import {View, Text} from 'react-native';
import Card from '../../../../components/Card';
import Input from '../../../../components/Input';
import {ScrollView} from 'react-native-gesture-handler';

export default function Home({route}) {
  const {dadosAluno} = route;
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <ScrollView
        style={{backgroundColor: '#222426'}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            paddingTop: 20,
          }}>
          Dados pessoais
        </Text>
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
      </ScrollView>
    </View>
  );
}
