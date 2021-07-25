import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: black;
`;

export const TextPrimary = styled.Text`
  font-size: 70px;
  color: #257ac9;
  text-transform: uppercase;
  font-weight: bold;
`;

export const Column = styled.View`
  ${props => 'background-color: ' + props.color};
  width: 100%;
  height: 50%;
  justify-content: flex-end;
  align-items: center;
`;
