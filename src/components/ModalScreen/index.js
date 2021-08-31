import React from 'react';
import {View, Text, Modal, BackHandler} from 'react-native';
import {getDateFormatter} from '../../utils/datetime';
import Card from '../Card';
import Icon from '../Icon';
import PesoSVG from '../../assets/peso.svg';
import AlturaSVG from '../../assets/altura.svg';
import CalucSVG from '../../assets/calc.svg';
import DashSVG from '../../assets/dash.svg';
import {IMC, statusIMC} from '../../utils/medidas';
import {useRef} from 'react';

export default function ModalScreen({
  showAlert,
  closeCallback,
  data,
  nomeAluno,
}) {
  return (
    <Modal animationType="slide" transparent visible={showAlert}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#222426',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {nomeAluno}
          </Text>
          <Icon name="close" onPress={closeCallback} />
        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 20,
          }}>
          {getDateFormatter(data?.data_criacao)}
        </Text>
        <View style={{flex: 1, marginTop: 30}}>
          <View style={{marginBottom: 20}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Medidas
            </Text>
            <Card
              elevation={6}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <View>
                <PesoSVG />
                <Text style={{color: '#fff'}}>{data?.peso} Kg</Text>
              </View>
              <View>
                <AlturaSVG />
                <Text style={{color: '#fff'}}>{data?.altura || '0.0'} M</Text>
              </View>
              <View>
                <CalucSVG />
                <Text style={{color: '#fff', marginTop: 5}}>
                  {IMC(data?.peso, data?.altura) || '0.0'}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <DashSVG />
                <Text
                  style={{color: '#fff', textAlign: 'center', marginTop: 2}}>
                  {statusIMC(IMC(data?.peso, data?.altura) || 0)}
                </Text>
              </View>
            </Card>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Superior
            </Text>
            <Card
              elevation={6}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Braço D</Text>
                <Text style={{color: '#fff'}}>
                  {data?.braco_direito || '0.0'} cm
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Braço E</Text>
                <Text style={{color: '#fff'}}>
                  {data?.braco_esquerdo || '0.0'} cm
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Antebraço E</Text>
                <Text style={{color: '#fff'}}>
                  {data?.antebraco_esquerdo || '0.0'} cm
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Antebraço D</Text>
                <Text style={{color: '#fff'}}>
                  {data?.antebraco_direito || '0.0'} cm
                </Text>
              </View>
            </Card>
            <Card
              elevation={6}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Ombro</Text>
                <Text style={{color: '#fff'}}>{data?.ombro || '0.0'} cm</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Peitoral</Text>
                <Text style={{color: '#fff'}}>
                  {data?.peitoral || '0.0'} cm
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Abdome</Text>
                <Text style={{color: '#fff'}}>{data?.abdome || '0.0'} cm</Text>
              </View>
            </Card>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Inferior
            </Text>
            <Card
              elevation={6}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Cintura</Text>
                <Text style={{color: '#fff'}}>{data?.cintura || '0.0'} cm</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Glúteo</Text>
                <Text style={{color: '#fff'}}>{data?.gluteo || '0.0'} cm</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Panturrilha D</Text>
                <Text style={{color: '#fff'}}>
                  {data?.panturrilha_direta || '0.0'} cm
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#257AC9'}}>Panturrilha E</Text>
                <Text style={{color: '#fff'}}>
                  {data?.panturrilha_esquerda || '0.0'} cm
                </Text>
              </View>
            </Card>
          </View>
        </View>
      </View>
    </Modal>
  );
}
