import React from 'react';
import {useState} from 'react';

import {ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Card from '../../../../components/Card';
import ModalScreen from '../../../../components/ModalScreen';
import {getDateFormatter} from '../../../../utils/datetime';

export default function Medicao({route}) {
  const {medicoesAluno, nomeAluno, screenLoading} = route;
  const [showMedicao, setVisibleMedicao] = useState(false);
  const [medicaoSelect, setMedicaoSelect] = useState({});

  // console.log(medicoesAluno);

  return (
    <View style={{backgroundColor: 'transparent'}}>
      <ModalScreen
        nomeAluno={nomeAluno}
        data={medicaoSelect}
        closeCallback={() => setVisibleMedicao(false)}
        showAlert={showMedicao}
      />
      <ScrollView>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            paddingTop: 20,
          }}>
          Histórico de Medições
        </Text>

        {medicoesAluno?.length > 0 ? (
          medicoesAluno.map((medicao, i) => {
            return (
              <Card
                onPress={() => {
                  setVisibleMedicao(true);
                  setMedicaoSelect(medicao);
                }}
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  borderRightColor: 'rgba(37, 122, 201, 1)',
                  borderRightWidth: 10,
                }}
                key={i}
                height={'100px'}>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingRight: 20,
                      position: 'relative',
                    }}>
                    <LinearGradient
                      colors={['#257AC9', '#222426']}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 35,
                        position: 'absolute',
                      }}>
                      {i + 1}°
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                      Medição
                    </Text>
                    <Text style={{color: '#fff', fontSize: 15, lineHeight: 30}}>
                      Realizado em
                      {medicao?.data_criacao
                        ? ' ' + getDateFormatter(medicao?.data_criacao)
                        : '-'}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                paddingTop: 20,
                textAlign: 'center',
              }}>
              Nenhuma medição cadastrada
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
