import { useState } from 'react';
import { FlatList } from 'react-native';
import { Category } from '../../types/Category';
import { Text } from '../Text';
import { CategoryContainer, Icon } from './styles';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
    onSelectCategory(category);
  }

  return (
    <>
      <FlatList
        data={categories}
        horizontal
        contentContainerStyle={{ paddingRight: 24 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={category => category._id}
        renderItem={({ item: category }) => {
          const isSelected = category._id === selectedCategory;
          return (
            <CategoryContainer
              key={category._id}
              onPress={() => handleSelectCategory(category._id)}
            >
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
              </Icon>

              <Text size={14} weight='600' opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
            </CategoryContainer>
          );
        }}
      />
    </>
  );
}
