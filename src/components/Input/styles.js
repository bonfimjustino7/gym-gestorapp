import styled from 'styled-components/native';

export const TextInputStyled = styled.TextInput`
  border-bottom-color: ${props => (props.error ? 'red' : '#fff')};
  border-bottom-width: 1px;
  color: #fff;
  height: 35px;
  padding: 0;
  font-size: 16px;
`;
