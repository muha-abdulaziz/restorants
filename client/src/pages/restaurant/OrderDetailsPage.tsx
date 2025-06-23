import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../api/restaurant.api';

const OrderDetailsPage = () => {
  const { restaurantId, orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getOrderById(restaurantId!, orderId!);
        setOrder(res.data.data);
      } catch (e) {
        setError('Failed to load order details');
      }
      setLoading(false);
    };
    fetchOrder();
  }, [restaurantId, orderId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!order) return <div className="p-4">Order not found</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      <div className="mb-2">
        <strong>Order ID:</strong> {order.id}
      </div>
      <div className="mb-2">
        <strong>Status:</strong> {order.status}
      </div>
      <div className="mb-2">
        <strong>Customer Email:</strong> {order.customer?.user?.email || '-'}
      </div>
      <div className="mb-2">
        <strong>Address:</strong> {order.address}
      </div>
      <div className="mb-2">
        <strong>Created At:</strong> {order.createdAt?.slice(0, 19).replace('T', ' ')}
      </div>
      <div className="mb-4">
        <strong>Meals:</strong>
        <table className="min-w-full border mt-2">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Count</th>
            </tr>
          </thead>
          <tbody>
            {order.meals?.map((meal: any) => (
              <tr key={meal.id}>
                <td className="border px-2 py-1">{meal.name_en}</td>
                <td className="border px-2 py-1">1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 