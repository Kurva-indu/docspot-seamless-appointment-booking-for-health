import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminAnalytics = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    pendingDoctors: 0,
    totalAppointments: 0,
  });

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/api/admin/analytics", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setData(res.data);
    } catch (error) {
      console.error("Analytics Error", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const chartData = [
    { name: "Users", count: data.totalUsers },
    { name: "Doctors", count: data.totalDoctors },
    { name: "Pending Doctors", count: data.pendingDoctors },
    { name: "Appointments", count: data.totalAppointments },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{data.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-sm">Total Doctors</h3>
          <p className="text-2xl font-bold">{data.totalDoctors}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-sm">Pending Doctors</h3>
          <p className="text-2xl font-bold">{data.pendingDoctors}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h3 className="text-sm">Appointments</h3>
          <p className="text-2xl font-bold">{data.totalAppointments}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
