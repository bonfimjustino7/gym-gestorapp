import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';

export default function Topic({style, status}) {
  const [color, setColor] = useState('red');

  function selectColor() {
    switch (status) {
      case 'ATIVA':
        return '#3CA617';
      case 'INATIVA':
        return 'red';
      default:
        return '';
    }
  }
  useEffect(() => {
    setColor(selectColor());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        borderRadius: 15,
        backgroundColor: color,
        width: 15,
        height: 15,
        ...style,
      }}
    />
  );
}
