import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
  justify-content: center;
  align-items: stretch;
  padding: 0 24px;
`;

export const ModalBody = styled.View`
  background-color: #FAFAFA;
  border-radius: 8px;
  padding: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.View`
  margin-top: 32px;
`;

export const Input = styled.TextInput`
  background-color: #FFF;
  padding: 16px;
  margin-bottom: 24px;
`;
