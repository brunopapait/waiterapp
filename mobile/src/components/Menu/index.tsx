import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { AddToCartButton, Image, Product, ProductDetails, Separator } from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => (
        <Product>
          <Image
            source={{ uri: `http://192.168.0.102:3001/uploads/${product.imagePath}` }}
          />
          <ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text weight="400" color='#666' size={14} style={{ paddingVertical: 8 }}>{product.description}</Text>
            <Text weight="600" size={14}>{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
      ItemSeparatorComponent={Separator}
    />
  );
}
