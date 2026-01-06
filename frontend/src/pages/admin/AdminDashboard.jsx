import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("recruiters"); // new state for tabs
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert("Admin access error");
      }
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        alert("Admin access error");
      }
    };
    fetchJobs();
  }, [token]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplications();
  }, [token]);

  const toggleUserStatus = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/user/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map(u =>
        u._id === id ? { ...u, isActive: res.data.isActive } : u
      ));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const recruiters = users.filter(u => u.role === "recruiter");
  const students = users.filter(u => u.role === "student");

return (
  <div className="dashboard">
    <h2>Admin Dashboard</h2>

    {/* ======== Tabs ======== */}
    <div className="admin-tabs">
      <button
        className={activeTab === "recruiters" ? "active-tab" : ""}
        onClick={() => setActiveTab("recruiters")}
      >
        Recruiters
      </button>
      <button
        className={activeTab === "students" ? "active-tab" : ""}
        onClick={() => setActiveTab("students")}
      >
        Students
      </button>
    </div>

    {/* ======== Recruiters Table ======== */}
    {activeTab === "recruiters" && (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Jobs Posted</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map(u => {
            const userJobs = jobs.filter(
              j => j.recruiter && j.recruiter._id === u._id
            );

            return (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>
                  {userJobs.length > 0
                    ? userJobs.map(j => j.title).join(", ")
                    : "No jobs"}
                </td>
                <td>{u.isActive ? "Active" : "Disabled"}</td>
                <td>
                  <button onClick={() => toggleUserStatus(u._id)}>
                    {u.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}

    {/* ======== Students Table ======== */}
    {activeTab === "students" && (
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Applications</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(u => {
            const userApplications = applications.filter(
              a => a.studentId && a.studentId._id === u._id
            );

            return (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>
                  {userApplications.length > 0
                    ? userApplications.map(a => a.jobId.title).join(", ")
                    : "No applications"}
                </td>
                <td>{u.isActive ? "Active" : "Disabled"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
);

};

export default AdminDashboard;
