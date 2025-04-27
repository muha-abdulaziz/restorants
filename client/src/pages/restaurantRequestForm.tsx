import React from "react";
import { Form, Input, Button, message } from "antd";
const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;

const RestaurantRequestForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${BASE_URL}/request/restaurant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Server error");

      message.success("Your request has been submitted!");
      form.resetFields();
    } catch (err) {
      message.error("Failed to submit the request. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Request a Restaurant Account
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Restaurant Name"
          name="restaurantName"
          rules={[
            { required: true, message: "Please enter the restaurant name" },
          ]}
        >
          <Input placeholder="Enter restaurant name" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            { required: true, message: "Please enter the restaurant location" },
          ]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item className="text-center mt-6">
          <Button type="primary" htmlType="submit" className="px-8">
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RestaurantRequestForm;
