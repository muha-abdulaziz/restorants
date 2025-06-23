import React, { useEffect, useState } from "react";
import { Table, Tag, Select, notification, Empty, Spin } from "antd";
import axios from "axios";
import { getToken } from "../helpers/auth";

const { Option } = Select;

const statusColors: Record<string, string> = {
  pending: "orange",
  "in transit": "blue",
  delivered: "green",
};

const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;
const ShipmentsForDeliveryPerson: React.FC = () => {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL + "/shipment", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }); 
      setShipments(response.data.data);
    } catch (error) {
      notification.error({ message: "Failed to load shipments" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (shipmentId: number, newStatus: string) => {
    try {
      await axios.patch(
        `${BASE_URL}/shipment/${shipmentId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setShipments((prev) =>
        prev.map((shipment) =>
          shipment.id === shipmentId
            ? { ...shipment, status: newStatus }
            : shipment
        )
      );
      notification.success({ message: `Status updated to "${newStatus}"` });
    } catch (error) {
      notification.error({ message: "Failed to update status" });
    }
  };

  const columns = [
    {
      title: "Shipment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order ID",
      render: (_: any, record: any) => record.order?.id || 'N/A',
      key: "orderId",
    },
    {
      title: "Customer Email",
        render: (_: any, record: any) => record.order?.customer?.user?.email || 'N/A',
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <Tag color={statusColors[record.status] || "default"}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Delivery Address",
        render: (_: any, record: any) => record.order?.address || 'N/A',
      key: "address",
    },
    {
      title: "Update Status",
      key: "updateStatus",
      render: (_: any, record: any) => (
        <Select
          defaultValue={record.status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 140 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="In Transit">In Transit</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Shipments</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {loading ? (
          <Spin />
        ) : shipments.length > 0 ? (
          <Table
            dataSource={shipments}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        ) : (
          <Empty description="No shipments assigned to you" />
        )}
      </div>
    </div>
  );
};

export default ShipmentsForDeliveryPerson;
