import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);

  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get("/api/admin/pending-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setPendingDoctors(res.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (doctorId) => {
    await axios.post(
      `/api/admin/approve-doctor/${doctorId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    fetchPendingDoctors();
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Doctor Requests</h2>
      <ul>
        {pendingDoctors.map((doc) => (
          <li key={doc._id} className="border p-2 mb-2">
            <p><strong>{doc.fullname}</strong> - {doc.specialization}</p>
            <p>Status: {doc.status}</p>
            <button
              onClick={() => handleApprove(doc._id)}
              className="bg-green-500 text-white px-2 py-1 mt-2"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
