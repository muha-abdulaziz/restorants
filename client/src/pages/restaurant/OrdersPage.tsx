import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurantOrders, updateOrderStatus } from '../../api/restaurant.api';

const ORDER_STATUSES = [
  'PENDING',
  'PREPARED',
  'ON_DELIVERY',
  'DELIVERED',
  'CANCELLED',
];

const PAGE_SIZE = 10;

const OrdersPage = () => {
  const { restaurantId } = useParams();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getRestaurantOrders(restaurantId!, page, PAGE_SIZE);
      setOrders(res.data.data.orders || []);
      setTotal(res.data.data.total || 0);
    } catch (e) {
      setError('Failed to load orders');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [restaurantId, page]);

  const handleStatusChange = async (orderId: number, status: string) => {
    setUpdatingId(orderId);
    setError('');
    try {
      await updateOrderStatus(restaurantId!, orderId, status);
      fetchOrders();
    } catch (e) {
      setError('Failed to update order status');
    }
    setUpdatingId(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table className="min-w-full border mb-4">
            <thead>
              <tr>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Customer</th>
                <th className="border px-2 py-1">Address</th>
                <th className="border px-2 py-1">Created At</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id}>
                  <td className="border px-2 py-1">{order.id}</td>
                  <td className="border px-2 py-1">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      disabled={updatingId === order.id}
                      className="border p-1"
                    >
                      {ORDER_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-2 py-1">{order.customer?.user?.username || '-'}</td>
                  <td className="border px-2 py-1">{order.address}</td>
                  <td className="border px-2 py-1">{order.createdAt?.slice(0, 19).replace('T', ' ')}</td>
                  <td className="border px-2 py-1">
                    {updatingId === order.id && <span>Updating...</span>}
                    <Link
                      to={`/restaurant/${restaurantId}/orders/${order.id}`}
                      className="ml-2 text-blue-600 underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 