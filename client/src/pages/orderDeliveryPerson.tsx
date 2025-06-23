import React from "react";
import { Card, Button, notification, Tag } from "antd";
import { getToken } from "../helpers/auth";

const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;
const OrdersQueueDeliveryPerson: React.FC = () => {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(BASE_URL + "/order/prepared", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }); 
      const data = await response.json();
  
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching prepared orders:", error);
      notification.error({ message: "Failed to fetch prepared orders" });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (orderId: number) => {
    try {
      await fetch(`${BASE_URL}/order/accept/${orderId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      notification.success({ message: "Order accepted!" });
    } catch (error) {
      console.error("Error accepting order:", error);
      notification.error({ message: "Failed to accept order" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Prepared Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No prepared orders available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {orders.map((order) => (
            <Card
              key={order.id}
              title={`Order #${order.id}`}
              className="shadow-lg"
              extra={
                <Button type="primary" onClick={() => handleAccept(order.id)}>
                  Accept
                </Button>
              }
            >
              <div className="space-y-2">
                <p>
                  Status:
                  <Tag color="green" className="ml-2">
                    {order.status}
                  </Tag>
                </p>
                <p>Customer: {order.customer?.user?.username ?? "Unknown"}</p>
                <p>Meals: {order?.meal.length} items</p>
                <p>Created at: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersQueueDeliveryPerson;
