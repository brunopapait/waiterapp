import { Overlay, ModalBody, OrderDetails, Actions } from './styles';
import close from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  onClose: () => void;
  order: Order | null;
}

export function OrderModal({ onClose, order }: OrderModalProps) {

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const total = order?.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay onClick={onClose}>
      <ModalBody>
        <header>
          <strong>Mesa 02</strong>
          <button type='button' onClick={onClose}>
            <img src={close} alt="BotÃ£o de fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>

          <div>
            <span>
              {order?.status === 'WAITING' && 'ð'}
              {order?.status === 'IN_PRODUCTION' && 'ð¨âð³'}
              {order?.status === 'DONE' && 'â'}
            </span>
            <strong>
              {order?.status === 'WAITING' && 'Fila de espera'}
              {order?.status === 'IN_PRODUCTION' && 'Em preparo'}
              {order?.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order?.products.map(({ _id, product, quantity }) => (
              <div className='item' key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={`Imagem do produto ${product.name}`}
                  width="56"
                  height="28.51"
                />

                <span className='quantity'>{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(Number(total))}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type='button' className='primary'>
            <span>ð¨âð³</span>
            <span>Iniciar produÃ§Ã£o</span>
          </button>
          <button type='button' className='secondary'>
            <span>Cancelar pedido</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
