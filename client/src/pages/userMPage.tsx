import { Table, Spin, Alert } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../helpers/auth";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;
export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<{data:User[]}>(BASE_URL+"/user", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setUsers(res.data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-2xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Users Management</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <div className="overflow-y-auto max-h-[500px] rounded-lg border border-gray-200">
            <Table
              columns={columns}
              dataSource={users}
              pagination={false}
              rowKey="id"
              scroll={{ y: 400 }}
              className="custom-ant-table"
            />
          </div>
        )}
      </div>
    </div>
  );
};
