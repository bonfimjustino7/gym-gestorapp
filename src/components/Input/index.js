import React from 'react';

import {View, Text} from 'react-native';

import {TextInputStyled} from './styles';

export default function Input({label, onChange, value, password}) {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{color: '#1C5F9D', fontSize: 16}}>{label}</Text>
      <TextInputStyled
        secureTextEntry={password}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}
