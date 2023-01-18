import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';

export function Main() {
  return (
    <>
      <Container>
        <Header />
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          <Button onPress={() => alert('propduto')}>
            Novo Pedido
          </Button>
        </FooterContainer>
      </Footer>

      <TableModal />
    </>
  );
}
