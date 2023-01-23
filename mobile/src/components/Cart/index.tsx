import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import { Actions, Image, Item, ProductContainer, QuantityContainer, ProductDetails, Summary, TotalContainer } from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
}

export default function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading] = useState(false);

  const isCartIsEmpty = cartItems.length === 0;

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      {!isCartIsEmpty && (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{ uri: `http://192.168.0.102:3001/uploads/${cartItem.product.imagePath}` }}
                />

                <QuantityContainer>
                  <Text color='#666' size={14}>{cartItem.quantity}x</Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text weight='600' size={14}>{cartItem.product.name}</Text>
                  <Text
                    style={{ marginTop: 4 }}
                    color='#666'
                    size={14}
                  >
                    {formatCurrency(cartItem.product.price * cartItem.quantity)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity style={{ marginRight: 24 }} onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          <Text color={!isCartIsEmpty ? '#666' : '#999'}>{!isCartIsEmpty ? 'Total' : 'Seu carrinho está vazio'}</Text>
          {!isCartIsEmpty && <Text weight='600' size={18}>{formatCurrency(total)}</Text>}
        </TotalContainer>

        <Button
          disabled={isCartIsEmpty}
          onPress={handleConfirmOrder}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>

      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />
    </>
  );
}
