import React from 'react';

import {View, Text} from 'react-native';

import {TextInputStyled} from './styles';

export default function Input({
  label,
  onChange,
  value,
  password,
  error,
  keyboardType,
}) {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{color: '#fff', fontSize: 16}}>{label}</Text>
      <TextInputStyled
        keyboardType={keyboardType}
        secureTextEntry={password}
        onChangeText={onChange}
        value={value}
        error={error}
      />
      {error && <Text style={{fontSize: 10, color: 'red'}}>{error}</Text>}
    </View>
  );
}
