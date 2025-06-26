import React, { useEffect, useState } from "react";
import AppLayout from "../components/Layout";
import axios from "axios";
import { Table, Button } from "antd";

function UserDashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/user/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctorName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button
          danger
          onClick={() => {
            // handle cancel here
          }}
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <AppLayout userType="user">
      <h2>My Appointments</h2>
      <Table dataSource={appointments} columns={columns} rowKey="_id" />
    </AppLayout>
  );
}

export default UserDashboard;
