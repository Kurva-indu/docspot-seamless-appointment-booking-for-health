import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
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
  );
};

export default AdminAnalytics;


import AdminAnalytics from "./AdminAnalytics";

// Add one more tab:
<button onClick={() => setTab("analytics")}>Analytics</button>

// Add below render condition:
{tab === "analytics" && <AdminAnalytics />}


router.get("/analytics", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isdoctor: false });
    const totalDoctors = await Doctor.countDocuments({});
    const pendingDoctors = await Doctor.countDocuments({ status: "pending" });
    const totalAppointments = await Appointment.countDocuments({});

    res.status(200).json({
      totalUsers,
      totalDoctors,
      pendingDoctors,
      totalAppointments,
    });
  } catch (err) {
    res.status(500).json({ error: "Analytics error" });
  }
});
