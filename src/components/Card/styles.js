import styled from 'styled-components/native';

export const CardView = styled.TouchableHighlight`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : 'auto')};
  background-color: #2a2b2c;
  margin-top: 15px;
  border-radius: 6px;
  elevation: ${props => (props.elevation ? props.elevation : 5)};
  align-items: center;
  justify-content: center;
`;

export const TextCard = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-top: 5px;
`;
