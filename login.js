import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", values);
      localStorage.setItem("token", res.data.token);
      message.success("Login successful");
      navigate("/");
    } catch (err) {
      message.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
