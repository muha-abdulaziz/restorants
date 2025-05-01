import React, { useState } from 'react';
import { Table, Tag, Select, notification, Empty } from 'antd';

const { Option } = Select;

// Mock data: Shipments assigned to the delivery person
const mockShipments = [
  {
    id: 1,
    orderId: 101,
    status: 'pending',
    estimatedArrival: '2025-04-30T12:00:00Z',
    address: '123 Main St, Cairo'
  },
  {
    id: 2,
    orderId: 102,
    status: 'in transit',
    estimatedArrival: '2025-05-01T16:00:00Z',
    address: '456 Second Ave, Giza'
  }
];

const statusColors: Record<string, string> = {
  pending: 'orange',
  'in transit': 'blue',
  delivered: 'green'
};

const ShipmentsForDeliveryPerson: React.FC = () => {
  const [shipments, setShipments] = useState(mockShipments);

  const handleStatusChange = (shipmentId: number, newStatus: string) => {
    setShipments(prev =>
      prev.map(shipment =>
        shipment.id === shipmentId ? { ...shipment, status: newStatus } : shipment
      )
    );
    notification.success({ message: `Status updated to "${newStatus}"` });
  };

  const columns = [
    {
      title: 'Shipment ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={statusColors[record.status] || 'default'}>
          {record.status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Estimated Arrival',
      dataIndex: 'estimatedArrival',
      key: 'estimatedArrival',
      render: (text: string) => new Date(text).toLocaleString()
    },
    {
      title: 'Delivery Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Update Status',
      key: 'updateStatus',
      render: (_: any, record: any) => (
        <Select
          defaultValue={record.status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 140 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="in transit">In Transit</Option>
          <Option value="delivered">Delivered</Option>
        </Select>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Shipments</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {shipments.length > 0 ? (
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
