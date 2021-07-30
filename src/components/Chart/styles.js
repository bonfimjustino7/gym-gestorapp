import styled from 'styled-components/native';
import Card from '../Card';

export const TextChart = styled.Text`
  width: 80%;
  color: #fff;
  font-size: ${props => (props.size ? props.size + 'px' : '20px')};
  ${props => props.bold && 'font-weight: bold'};
`;

export const CardChart = styled(Card)`
  top: 20px;
  position: absolute;
  flex-direction: row;
  /* justify-content: space-around; */
  padding: 0 30px;
`;
