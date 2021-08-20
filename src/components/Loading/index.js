import React from 'react';
import {useRef} from 'react';
import {View, Text, Animated, ActivityIndicator, Modal} from 'react-native';

export default function Loading({showModal}) {
  return (
    <Modal animationType="fade" transparent visible={showModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#222426',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
}
