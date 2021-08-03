import React from 'react';

import {View, Text} from 'react-native';
import {maskCNPJ, maskCPF, maskPhone} from './mask';

import {TextInputStyled} from './styles';

export default function Input({
  label,
  onChange,
  value,
  password,
  error,
  keyboardType,
  typeMask,
  size,
}) {
  function handlerMask(valueMask) {
    let valueMasked;
    if (typeMask === 'cpf') {
      valueMasked = maskCPF(valueMask);
    } else if (typeMask === 'phone') {
      valueMasked = maskPhone(valueMask);
    } else if (typeMask === 'cnpj') {
      valueMasked = maskCNPJ(valueMask);
    } else {
      valueMasked = valueMask;
    }
    onChange(valueMasked);
  }

  return (
    <View style={{marginBottom: 10}}>
      <Text style={{color: '#fff', fontSize: 16}}>{label}</Text>
      <TextInputStyled
        maxLength={size}
        keyboardType={keyboardType}
        secureTextEntry={password}
        onChangeText={value => handlerMask(value)}
        value={value}
        error={error}
      />
      {error && <Text style={{fontSize: 10, color: 'red'}}>{error}</Text>}
    </View>
  );
}
