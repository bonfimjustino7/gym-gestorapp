import React from 'react';
import {FloatingButtonHighlight} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingButton({onPress}) {
  return (
    <FloatingButtonHighlight onPress={onPress} underlayColor="#2571C0">
      <Icon name="plus" color="#fff" size={25} />
    </FloatingButtonHighlight>
  );
}
