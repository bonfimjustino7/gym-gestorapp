import styled from 'styled-components/native';

export const FloatingButtonHighlight = styled.TouchableHighlight`
  width: 60px;
  height: 60px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #257ac9;
  position: absolute;
  bottom: 20px;
  right: 15px;
  z-index: 10000;
  align-items: center;
  justify-content: center;
`;
