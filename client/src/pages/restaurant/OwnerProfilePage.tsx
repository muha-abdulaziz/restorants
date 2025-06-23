import { useEffect, useState } from 'react';
import { getRestaurantProfile, updateRestaurantProfile } from '../../api/restaurant.api';
import { Button, Card, Form, Input, Spin, Typography, Row, Col, notification } from 'antd';

const { Title } = Typography;

export function OwnerProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getRestaurantProfile()
      .then((response) => {
        const profileData = response.data.data;
        setProfile(profileData);
        form.setFieldsValue(profileData);
      })
      .catch(() => {
        notification.error({ message: 'Failed to fetch profile' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);

  const onFinish = (values: any) => {
    setLoading(true);
    updateRestaurantProfile(values)
      .then((response) => {
        const updatedProfile = response.data.data;
        setProfile(updatedProfile);
        form.setFieldsValue(updatedProfile);
        notification.success({ message: response.data.message || 'Profile updated successfully' });
      })
      .catch(() => {
        notification.error({ message: 'Failed to update profile' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading && !profile) {
    return <Spin size="large" className="flex justify-center items-center h-full" />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={2} className="mb-6">My Profile</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Owner Details" bordered={false}>
            <p><strong>Username:</strong> {profile?.owner?.user?.username}</p>
            <p><strong>Email:</strong> {profile?.owner?.user?.email}</p>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card title="Restaurant Details" bordered={false}>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={profile}>
              <Form.Item name="name" label="Restaurant Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 