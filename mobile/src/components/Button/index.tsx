import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>

      {loading && (
        <ActivityIndicator
          color="#FFF"
        />
      )}

      {!loading && (
        <Text
          weight="600"
          color="#FFF"
        >
          {children}
        </Text>
      )}
    </Container>
  );
}
