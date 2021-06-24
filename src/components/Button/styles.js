import styled from 'styled-components/native';

export const ButtonView = styled.TouchableHighlight`
  padding: 10px;
  background-color: ${props =>
    props.trasparent ? 'rgba(37, 122, 201, 0.3)' : '#257ac9'};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const LabelButton = styled.Text`
  color: #fff;
  font-size: 17px;
  text-transform: uppercase;
  font-weight: bold;
`;
