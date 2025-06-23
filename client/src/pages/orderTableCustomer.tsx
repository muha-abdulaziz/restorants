import React, { useEffect, useState } from "react";
import { Table, Card, Spin, message } from "antd";
import axios from "axios";
import { getToken } from "../helpers/auth";

const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;

// address: "Cairo"
// createdAt: "2025-05-02T15:01:49.560Z"
// id: 21
// meal: Array []
// status: "PREPARED"
// updatedAt: "2025-05-02T15:01:49.560Z"

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(BASE_URL + "/order/all", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      message.error("Failed to fetch orders.");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => new Date(text).toLocaleString(),
    },
    { title: "status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Card title="Your Orders" className="shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        )}
      </Card>
    </div>
  );
};

export default CustomerOrdersPage;
