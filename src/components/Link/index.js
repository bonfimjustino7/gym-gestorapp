import React from 'react';
import {TouchableOpacity} from 'react-native';

import {TextStyled} from './styles';

export default function Link({onPress, text}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextStyled>{text}</TextStyled>
    </TouchableOpacity>
  );
}
