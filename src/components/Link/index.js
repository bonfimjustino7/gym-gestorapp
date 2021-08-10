import React from 'react';
import {TouchableOpacity} from 'react-native';

import {TextStyled} from './styles';

export default function Link({onPress, text, style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextStyled style={style}>{text}</TextStyled>
    </TouchableOpacity>
  );
}
