 import React, { useEffect, useState } from "react";
import AppLayout from "../components/Layout";
import axios from "axios";
import { Table, Button, Tag } from "antd";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/doctor/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(
      `http://localhost:5000/api/doctor/update-appointment/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchAppointments();
  };

  const columns = [
    {
      title: "Patient",
      dataIndex: "patientName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <Tag color={status === "scheduled" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button onClick={() => handleStatusChange(record._id, "scheduled")}>Approve</Button>{" "}
          <Button danger onClick={() => handleStatusChange(record._id, "cancelled")}>
            Cancel
          </Button>
        </>
      ),
    },
  ];

  return (
    <AppLayout userType="doctor">
      <h2>Manage Appointments</h2>
      <Table dataSource={appointments} columns={columns} rowKey="_id" />
    </AppLayout>
  );
}

export default DoctorDashboard;
