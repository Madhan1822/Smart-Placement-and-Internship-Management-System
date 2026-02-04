import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { FaUsers, FaUserGraduate, FaUserTie, FaBriefcase, FaSyncAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stats");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const statsData = [
    { label: "Total Users", value: stats.totalUsers || 0, icon: <FaUsers />, color: "#4338ca" },
    { label: "Students", value: stats.totalStudents || 0, icon: <FaUserGraduate />, color: "#059669" },
    { label: "Recruiters", value: stats.totalRecruiters || 0, icon: <FaUserTie />, color: "#d97706" },
    { label: "Total Jobs", value: stats.totalJobs || 0, icon: <FaBriefcase />, color: "#e11d48" }
  ];

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Admin Dashboard</h2>
        <button 
          onClick={fetchStats} 
          style={{
            background: "#0d5fe2", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px"
          }}
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {loading ? (
        <div>Loading stats...</div>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {statsData.map((s, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 200px",
                background: s.color,
                color: "#fff",
                padding: "24px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ fontSize: "2rem" }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>{s.value}</div>
                <div>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
