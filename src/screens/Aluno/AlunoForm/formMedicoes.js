import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default function FormMedicoes({
  labelButton,
  onPressBack,
  onSubmit,
  initial,
}) {
  const validate = Yup.object({
    peso: Yup.number(),
    altura: Yup.number(),
    braco_direito: Yup.number(),
    braco_esquerdo: Yup.number(),
    ante_braco_direito: Yup.number(),
    antebraco_esquerdo: Yup.number(),
    ombro: Yup.number(),
    peitoral: Yup.number(),
    abdome: Yup.number(),
    cintura: Yup.number(),
    gluteo: Yup.number(),
    coxa_direita: Yup.number(),
    coxa_esquerda: Yup.number(),
    panturrilha_direta: Yup.number(),
    panturrilha_esquerda: Yup.number(),
  });
  return (
    <Formik
      validationSchema={validate}
      onSubmit={values => {
        onSubmit(values);
      }}
      initialValues={{
        peso: '0.0',
        altura: '0.0',
        braco_direito: '0.0',
        braco_esquerdo: '0.0',
        antebraco_direito: '0.0',
        antebraco_esquerdo: '0.0',
        ombro: '0.0',
        peitoral: '0.0',
        abdome: '0.0',
        cintura: '0.0',
        gluteo: '0.0',
        coxa_direita: '0.0',
        coxa_esquerda: '0.0',
        panturrilha_direta: '0.0',
        panturrilha_esquerda: '0.0',
        ...initial,
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View>
          <Input
            keyboardType="numeric"
            value={values.peso}
            error={touched.peso && errors.peso}
            label="Peso"
            onChange={handleChange('peso')}
          />
          <Input
            keyboardType="numeric"
            value={values.altura}
            error={touched.altura && errors.altura}
            label="Altura"
            onChange={handleChange('altura')}
          />
          <View style={{flexDirection: 'row'}}>
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.braco_direito}
              error={touched.braco_direito && errors.braco_direito}
              label="Braço direito"
              onChange={handleChange('braco_direito')}
            />
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.braco_esquerdo}
              error={touched.braco_esquerdo && errors.braco_esquerdo}
              label="Braço esquerdo"
              onChange={handleChange('braco_esquerdo')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.antebraco_direito}
              error={touched.antebraco_direito && errors.antebraco_direito}
              label="Antebraço direito"
              onChange={handleChange('antebraco_direito')}
            />
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.antebraco_esquerdo}
              error={touched.antebraco_esquerdo && errors.antebraco_esquerdo}
              label="Antebraço esquerdo"
              onChange={handleChange('antebraco_esquerdo')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.ombro}
              error={touched.ombro && errors.ombro}
              label="Ombro"
              onChange={handleChange('ombro')}
            />
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.peitoral}
              error={touched.peitoral && errors.peitoral}
              label="Peitoral"
              onChange={handleChange('peitoral')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.abdome}
              error={touched.abdome && errors.abdome}
              label="Abdome"
              onChange={handleChange('abdome')}
            />
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.cintura}
              error={touched.cintura && errors.cintura}
              label="Cintura"
              onChange={handleChange('cintura')}
            />
          </View>
          <Input
            style={{flex: 1, marginRight: 10}}
            keyboardType="numeric"
            value={values.gluteo}
            error={touched.gluteo && errors.gluteo}
            label="Glúteo"
            onChange={handleChange('gluteo')}
          />

          <View style={{flexDirection: 'row'}}>
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.coxa_direita}
              error={touched.coxa_direita && errors.coxa_direita}
              label="Coxa Direita"
              onChange={handleChange('coxa_direita')}
            />
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.coxa_esquerda}
              error={touched.coxa_esquerda && errors.coxa_esquerda}
              label="Coxa Esquerda"
              onChange={handleChange('coxa_esquerda')}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.panturrilha_direta}
              error={touched.panturrilha_direta && errors.panturrilha_direta}
              label="Panturrilha Direta"
              onChange={handleChange('panturrilha_direta')}
            />
            <Input
              style={{flex: 1, marginRight: 10}}
              keyboardType="numeric"
              value={values.panturrilha_esquerda}
              error={
                touched.panturrilha_esquerda && errors.panturrilha_esquerda
              }
              label="Panturrilha Esquerda"
              onChange={handleChange('panturrilha_esquerda')}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            {onPressBack && (
              <Button
                style={{marginVertical: 20, flex: 1}}
                label="Voltar"
                transparent
                onPress={onPressBack}
                marginRight={10}
              />
            )}

            <Button
              style={{marginVertical: 20}}
              label={labelButton || 'Enviar'}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
