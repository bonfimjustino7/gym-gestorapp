import React from 'react';

import {View} from 'react-native';

import {ButtonView, LabelButton} from './styles';

export default function Button({label, onPress, style, transparent}) {
  return (
    <View style={{marginTop: 10}}>
      <ButtonView
        trasparent={transparent}
        underlayColor={transparent ? 'rgba(37, 122, 201, 0.2)' : '#164878'}
        onPress={onPress}
        style={style}>
        <LabelButton>{label}</LabelButton>
      </ButtonView>
    </View>
  );
}
