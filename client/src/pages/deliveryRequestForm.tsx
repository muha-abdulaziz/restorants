import React from "react";
import { Form, Input, Button, message, Select } from "antd";
const { Option } = Select;
const BASE_URL = process.env.REACT_APP_BACKEND_URL_API;
const DeliveryRequestForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${BASE_URL}/request/delivery`, {
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
        Request a Delivery Account
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
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Vehicle Type"
          name="vehicleType"
          rules={[
            { required: true, message: "Please select your vehicle type" },
          ]}
        >
          <Select placeholder="Select your vehicle type">
            <Option value="motorbike">Motorbike</Option>
            <Option value="car">Car</Option>
            <Option value="bicycle">Bicycle</Option>
            <Option value="scooter">Scooter</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="License Plate"
          name="licensePlate"
          rules={[
            {
              required: true,
              message: "Please enter your license plate number",
            },
          ]}
        >
          <Input placeholder="Enter your license plate number" />
        </Form.Item>

        <Form.Item
          label="Driving License"
          name="drivingLicense"
          rules={[
            { required: true, message: "Please enter your driving license" },
          ]}
        >
          <Input placeholder="Enter your driving license" />
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

export default DeliveryRequestForm;
