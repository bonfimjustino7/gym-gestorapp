import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
`;

export const Overlay = styled.View`
  position: absolute;
  width: 100%;
  background-color: #333;
  height: 360px;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  z-index: 1;
`;
