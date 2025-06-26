import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/users/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email})
            <button onClick={() => handleDelete(u._id)} className="ml-2 text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;


import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/users/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email})
            <button onClick={() => handleDelete(u._id)} className="ml-2 text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await axios.get("/api/admin/doctors", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    setDoctors(res.data);
  };

  const approveDoctor = async (id) => {
    await axios.post(`/api/admin/approve-doctor/${id}`, {}, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    fetchDoctors();
  };

  const rejectDoctor = async (id) => {
    await axios.post(`/api/admin/reject-doctor/${id}`, {}, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await axios.delete(`/api/admin/doctors/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    fetchDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>All Doctors</h2>
      {doctors.map((d) => (
        <div key={d._id} className="border p-2 mb-2">
          <strong>{d.fullname}</strong> - {d.specialization} ({d.status})
          <div className="flex gap-2 mt-2">
            {d.status === "pending" && (
              <>
                <button onClick={() => approveDoctor(d._id)} className="text-green-600">Approve</button>
                <button onClick={() => rejectDoctor(d._id)} className="text-yellow-600">Reject</button>
              </>
            )}
            <button onClick={() => deleteDoctor(d._id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/appointments", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }).then((res) => setAppointments(res.data));
  }, []);

  return (
    <div>
      <h2>All Appointments</h2>
      {appointments.map((a) => (
        <div key={a._id} className="border p-2 mb-2">
          <p>User: {a.userInfo?.name}</p>
          <p>Doctor: {a.doctorInfo?.fullname}</p>
          <p>Date: {a.date}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
