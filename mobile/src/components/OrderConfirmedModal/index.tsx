import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ onOk, visible }: OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <Container>
        <CheckCircle />
        <Text
          weight='600'
          size={20}
          color="#FFF"
          style={{
            marginTop: 12,
            marginBottom: 4
          }}
        >
          Pedido confirmado
        </Text>
        <Text
          color="#FFF"
          opacity={0.9}
        >
          O pedido já entrou na fila de produção !
        </Text>
        <OkButton onPress={onOk}>
          <Text weight='600' color='#D73035'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
