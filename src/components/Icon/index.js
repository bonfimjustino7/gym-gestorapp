import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Icon({onPress, name, color, size, style}) {
  return (
    <View>
      <>
        <TouchableHighlight
          style={{
            marginLeft: 3,
            alignItems: 'center',
            borderRadius: 50,
            padding: 10,
            ...style,
          }}
          onPress={onPress}
          underlayColor="#2571C0">
          <MaterialIcon
            size={size ? size : 25}
            color={color ? color : '#fff'}
            name={name}
          />
        </TouchableHighlight>
      </>
    </View>
  );
}
