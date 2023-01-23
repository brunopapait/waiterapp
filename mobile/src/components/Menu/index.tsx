import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import ProductModal from '../ProductModal';
import { Text } from '../Text';
import { AddToCartButton, Image, ProductContainer, ProductDetails, Separator } from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenProductModal(product: Product) {
    setSelectedProduct(product);
    setIsProductModalVisible(true);
  }
  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenProductModal(product)}>
            <Image
              source={{ uri: `http://192.168.0.102:3001/uploads/${product.imagePath}` }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text weight="400" color='#666' size={14} style={{ paddingVertical: 8 }}>{product.description}</Text>
              <Text weight="600" size={14}>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
        ItemSeparatorComponent={Separator}
      />

      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setIsProductModalVisible(prevState => !prevState)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
