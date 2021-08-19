import React from 'react';

import {View, ActivityIndicator} from 'react-native';

import {ButtonView, LabelButton} from './styles';

export default function Button({
  label,
  onPress,
  style,
  transparent,
  loading,
  marginLeft,
  marginRight,
}) {
  return (
    <View
      style={{
        marginTop: 10,
        flex: 1,
        marginRight: marginRight,
        marginLeft: marginLeft,
      }}>
      <ButtonView
        disabled={loading}
        trasparent={transparent}
        underlayColor={transparent ? 'rgba(37, 122, 201, 0.2)' : '#164878'}
        onPress={onPress}
        style={style}>
        <LabelButton>
          {loading ? <ActivityIndicator size={'small'} color="#fff" /> : label}
        </LabelButton>
      </ButtonView>
    </View>
  );
}
