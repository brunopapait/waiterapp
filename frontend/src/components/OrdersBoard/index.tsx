import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onOrderStatusChange }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order): void {
    setSelectedOrder(order);
    setIsModalVisible(prevState => !prevState);
  }

  function handleCloseModal(): void {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const newStatus = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    const orderId = selectedOrder?._id;
    await api.patch(`/orders/${orderId}`, { status: newStatus });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
    onOrderStatusChange(orderId!, newStatus);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    const orderId = selectedOrder?._id;
    await api.delete(`/orders/${orderId}`);
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    onCancelOrder(orderId!);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button
              key={order._id}
              type='button'
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

      {isModalVisible &&
        <OrderModal
          onClose={handleCloseModal}
          order={selectedOrder}
          onCancelOrder={handleCancelOrder}
          isLoading={isLoading}
          onChangeOrderStatus={handleChangeOrderStatus}
        />}
    </Board>
  );
}
