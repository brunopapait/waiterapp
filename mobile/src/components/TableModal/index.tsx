import { Modal } from 'react-native';
import { Text } from '../Text';
import { ModalBody, Overlay } from './styles';

export function TableModal() {
  return (
    <Modal
      transparent
    >
      <Overlay>
        <ModalBody>
          <Text>A</Text>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
