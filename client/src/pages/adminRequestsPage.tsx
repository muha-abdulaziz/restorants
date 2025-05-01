import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, message, Spin, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface RestaurantRequest {
  id: number;
  restaurantName: string;
  location: string;
  username: string;
  email: string;
  status: string;
  adminComment: string;
}

interface DeliveryRequest {
  id: number;
  username: string;
  email: string;
  licensePlate: string;
  vehicleType: string;
  drivingLicense: string;
  status: string;
  adminComment: string;
}
const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;
const AdminRequestsPage: React.FC = () => {
  const [restaurantRequests, setRestaurantRequests] = useState<
    RestaurantRequest[]
  >([]);
  const [deliveryRequests, setDeliveryRequests] = useState<DeliveryRequest[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectType, setRejectType] = useState<
    "restaurant" | "delivery" | null
  >(null);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [adminComment, setAdminComment] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const [restaurantRes, deliveryRes] = await Promise.all([
        axios.get<RestaurantRequest[]>(`${BASE_URL}/request/restaurant/all`),
        axios.get<DeliveryRequest[]>(`${BASE_URL}/request/delivery/all`),
      ]);
      setRestaurantRequests(restaurantRes.data);
      setDeliveryRequests(deliveryRes.data);
    } catch (error) {
      message.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (
    type: "restaurant" | "delivery",
    id: number,
    status: string,
    comment: string = ""
  ) => {
    try {
      await axios.patch(`${BASE_URL}/request/${type}/admin/${id}`, {
        status,
        adminComment: comment,
      });
      message.success(`Status updated to ${status}`);
      fetchRequests();
    } catch {
      message.error("Failed to update status");
    }
  };

  const handleAccept = (type: "restaurant" | "delivery", record: any) => {
    if (record.status === "ACCEPTED") {
      message.warning("Already accepted");
      return;
    }
    changeStatus(type, record.id, "ACCEPTED");
  };

  const openRejectModal = (
    type: "restaurant" | "delivery",
    id: number,
    currentStatus: string
  ) => {
    if (currentStatus === "ACCEPTED") {
      message.warning("Cannot reject an accepted request");
      return;
    }
    setRejectType(type);
    setRejectId(id);
    setAdminComment("");
    setIsRejectModalOpen(true);
  };

  const submitRejection = () => {
    if (!rejectType || rejectId === null || adminComment.trim() === "") {
      message.warning("Please provide a comment before rejecting.");
      return;
    }
    changeStatus(rejectType, rejectId, "REJECTED", adminComment);
    setIsRejectModalOpen(false);
  };

  const renderStatus = (status: string) => {
    const color =
      status === "ACCEPTED"
        ? "green"
        : status === "REJECTED"
        ? "red"
        : "orange";
    return <Tag color={color}>{status}</Tag>;
  };

  const restaurantColumns: ColumnsType<RestaurantRequest> = [
    { title: "Restaurant Name", dataIndex: "restaurantName" },
    { title: "Location", dataIndex: "location" },
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "status",
      render: renderStatus,
    },
    {
      title: "Comment",
      dataIndex: "adminComment",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          {record.status === "ACCEPTED" ? (
            <></>
          ) : (
            <Button
              type="primary"
              onClick={() => handleAccept("restaurant", record)}
            >
              Accept
            </Button>
          )}
          {record.status === "REJECTED" ? (
            <></>
          ) : (
            <Button
              danger
              onClick={() =>
                openRejectModal("restaurant", record.id, record.status)
              }
            >
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  const deliveryColumns: ColumnsType<DeliveryRequest> = [
    { title: "Username", dataIndex: "username" },
    { title: "Email", dataIndex: "email" },
    { title: "Vehicle Type", dataIndex: "vehicleType" },
    { title: "License Plate", dataIndex: "licensePlate" },
    { title: "Driving License", dataIndex: "drivingLicense" },
    {
      title: "Status",
      dataIndex: "status",
      render: renderStatus,
    },
    {
      title: "Comment",
      dataIndex: "adminComment",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          {record.status === "ACCEPTED" ? (
            <></>
          ) : (
            <Button
              type="primary"
              onClick={() => handleAccept("delivery", record)}
            >
              Accept
            </Button>
          )}
          {record.status === "REJECTED" ? (
            <></>
          ) : (
            <Button
              danger
              onClick={() =>
                openRejectModal("delivery", record.id, record.status)
              }
            >
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Requests</h1>

      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          <div className="m-4">
            <h2 className="text-xl font-semibold mb-2">Restaurant Requests</h2>
            <Table
              columns={restaurantColumns}
              dataSource={restaurantRequests}
              rowKey="id"
              pagination={false}
            />
          </div>

          <div className="m-4">
            <h2 className="text-xl font-semibold mb-2">Delivery Requests</h2>
            <Table
              columns={deliveryColumns}
              dataSource={deliveryRequests}
              rowKey="id"
              pagination={false}
            />
          </div>
        </div>
      )}

      <Modal
        title="Reject Request"
        open={isRejectModalOpen}
        onOk={submitRejection}
        onCancel={() => setIsRejectModalOpen(false)}
        okText="Reject"
        okButtonProps={{ danger: true }}
      >
        <p>Please enter a reason for rejection:</p>
        <textarea
          value={adminComment}
          onChange={(e) => setAdminComment(e.target.value)}
          className="w-full mt-2 border rounded p-2 min-h-[100px]"
          placeholder="Your comment..."
        />
      </Modal>
    </div>
  );
};

export default AdminRequestsPage;
