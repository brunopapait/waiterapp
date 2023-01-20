import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { Actions, Image, Item, ProductContainer, QuantityContainer, ProductDetails } from './styles';

interface CartProps {
  cartItems: CartItem[];
}

export default function Cart({ cartItems }: CartProps) {
  return (
    <FlatList
      data={cartItems}
      keyExtractor={item => item.product._id}
      showsVerticalScrollIndicator={false}
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
                {formatCurrency(cartItem.product.price)}
              </Text>
            </ProductDetails>
          </ProductContainer>
          <Actions>
            <TouchableOpacity style={{ marginRight: 24 }}>
              <PlusCircle />
            </TouchableOpacity>

            <TouchableOpacity>
              <MinusCircle />
            </TouchableOpacity>
          </Actions>
        </Item>
      )}
    />
  );
}
