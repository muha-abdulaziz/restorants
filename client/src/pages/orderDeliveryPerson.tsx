import React from 'react';
import { Card, Button, notification, Tag } from 'antd';

const mockOrders = [
  {
    id: 1,
    status: 'prepared',
    createdAt: '2025-04-27T14:00:00Z',
    updatedAt: '2025-04-27T15:00:00Z',
    shipment: {},
    meal: [{ id: 1, name: 'Burger' }, { id: 2, name: 'Fries' }],
    customer: { id: 1, name: 'John Doe' }
  },
  {
    id: 2,
    status: 'pending',
    createdAt: '2025-04-27T14:30:00Z',
    updatedAt: '2025-04-27T15:30:00Z',
    shipment: {},
    meal: [{ id: 3, name: 'Pizza' }],
    customer: { id: 2, name: 'Jane Smith' }
  }
];

const OrdersQueueDeliveryPerson: React.FC = () => {
  const [orders, setOrders] = React.useState(mockOrders);

  const handleAccept = (orderId: number) => {
    // Simulate accepting an order
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'accepted' } : order
      )
    );
    notification.success({ message: 'Order accepted!' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Orders Queue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {orders.map(order => {
          const isPrepared = order.status.toLowerCase() === 'prepared';
          return (
            <Card
              key={order.id}
              title={`Order #${order.id}`}
              className="shadow-lg"
              extra={
                <Button
                  type="primary"
                  disabled={!isPrepared}
                  onClick={() => handleAccept(order.id)}
                >
                  Accept
                </Button>
              }
            >
              <div className="space-y-2">
                <p>Status:
                  <Tag color={isPrepared ? "green" : order.status === 'accepted' ? "blue" : "orange"} className="ml-2">
                    {order.status}
                  </Tag>
                </p>
                <p>Customer: {order.customer?.name ?? 'Unknown'}</p>
                <p>Meals: {order.meal.length} items</p>
                <p>Created at: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};



export default OrdersQueueDeliveryPerson;
