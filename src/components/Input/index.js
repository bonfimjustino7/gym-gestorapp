import React from 'react';

import {View, Text, TextInput} from 'react-native';
import {maskCNPJ, maskCPF, maskPhone} from './mask';

import {TextInputStyled} from './styles';

export default function Input({
  label,
  colorLabel,
  onChange,
  value,
  password,
  error,
  keyboardType,
  typeMask,
  size,
  style,
  readonly,
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
    <View style={{marginBottom: 20, ...style}}>
      <Text style={{color: colorLabel ? colorLabel : '#FFF', fontSize: 16}}>
        {label}
      </Text>
      <TextInputStyled
        editable={!readonly}
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
