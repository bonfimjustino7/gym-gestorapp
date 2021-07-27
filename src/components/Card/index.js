import React from 'react';
import {CardView, TextCard} from './styles';

export default function Card({
  width,
  height,
  elevation,
  children,
  style,
  label,
  onPress,
}) {
  return (
    <CardView
      width={width}
      height={height}
      elevation={elevation}
      style={style}
      underlayColor="#141415"
      onPress={onPress}>
      <>
        {children}
        {label && <TextCard>{label}</TextCard>}
      </>
    </CardView>
  );
}
