import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const ManageUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("recruiters");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, j, a] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/admin/jobs", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/admin/applications", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUsers(u.data);
        setJobs(j.data);
        setApplications(a.data);
      } catch (err) {
        console.error("Admin fetch error", err.response?.data);
      }
    };

    fetchData();
  }, [token]);

  // 🔥 ENABLE / DISABLE USER
  const toggleUserStatus = async (id) => {
    const res = await axios.put(
      `http://localhost:5000/api/admin/user/${id}/toggle`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUsers(users.map(u =>
      u._id === id ? { ...u, isActive: res.data.isActive } : u
    ));
  };

  const recruiters = users.filter(u => u.role === "recruiter");
  const students = users.filter(u => u.role === "student");

  return (
    <AdminLayout>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "12px" }}>Manage Users</h2>
        <div style={{ display: "inline-flex", gap: "12px" }}>
          <button onClick={() => setActiveTab("recruiters")}>Recruiters</button>
          <button onClick={() => setActiveTab("students")}>Students</button>
        </div>
      </div>

      {/* RECRUITERS */}
      {activeTab === "recruiters" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Jobs Posted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{jobs.filter(j => j.recruiter?._id === r._id).length}</td>
                <td>{r.isActive ? "Active" : "Disabled"}</td>
                <td>
                  <button onClick={() => toggleUserStatus(r._id)}>
                    {r.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* STUDENTS */}
      {activeTab === "students" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Applications</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>
                  {applications.filter(
                    a => a.studentId?._id === s._id || a.studentId === s._id
                  ).length}
                </td>
                <td>{s.isActive ? "Active" : "Disabled"}</td>
                <td>
                  <button onClick={() => toggleUserStatus(s._id)}>
                    {s.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
};

export default ManageUsers;
