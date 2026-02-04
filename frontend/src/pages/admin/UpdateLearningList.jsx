import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const UpdateLearningList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/learning", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTopics(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load learning topics");
      }
    };

    fetchTopics();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this topic?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/learning/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTopics(topics.filter(t => t._id !== id));
      alert("Topic deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete topic");
    }
  };

  return (
    <AdminLayout>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Learning Topics
      </h2>

      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topics.length === 0 ? (
            <tr>
              <td colSpan="2">No topics found</td>
            </tr>
          ) : (
            topics.map(t => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>
                  <button onClick={() => navigate(`/admin/update-learning/${t._id}`)}>
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px", backgroundColor: "#e74c3c", color: "#fff" }}
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default UpdateLearningList;
