import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { CloseButton, Header, Image, ModalBody, IngredientsContainer, Ingredient, Footer, FooterContainer, PriceContainer } from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export default function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      onRequestClose={onClose}
    >
      <Image
        source={{ uri: `http://192.168.0.102:3001/uploads/${product.imagePath}` }}>
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text weight='600' size={24}>{product.name}</Text>
          <Text color='#666' style={{ marginTop: 8 }}>{product.description}</Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight='600' color='#666'>Ingredientes</Text>

            <FlatList
              keyExtractor={ingredient => ingredient._id}
              data={product.ingredients}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text style={{ marginLeft: 20 }} size={14} color='#666'>{ingredient.name}</Text>
                </Ingredient>
              )}

            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color='#666'>Preço</Text>
            <Text weight='600' size={20}>{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={() => { }}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
