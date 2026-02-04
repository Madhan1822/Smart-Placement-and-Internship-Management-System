import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const UpdateLearningTopic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [learningLinks, setLearningLinks] = useState([]);
  const [practiceLinks, setPracticeLinks] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/learning/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTitle(res.data.title);
        setLearningLinks(res.data.learningLinks || []);
        setPracticeLinks(res.data.practiceLinks || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load topic");
      }
    };

    fetchTopic();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/learning/${id}`,
        { title, learningLinks, practiceLinks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Topic Updated Successfully");
      navigate("/admin/update-learning");
    } catch (err) {
      console.error(err);
      alert("Failed to update topic");
    }
  };

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header"><h1>Admin Dashboard</h1></div>

      {/* SIDEBAR */}
      <div className="sidebar open">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Manage Users</NavLink>
        <NavLink to="/admin/learning">Post Learning</NavLink>
        <NavLink to="/admin/update-learning">Update Learning</NavLink>
      </div>

      {/* MAIN CONTENT */}
      <div className="content shift">
        <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
          Update Learning Topic
        </h2>

        <form onSubmit={handleUpdate}>
          <input
            placeholder="Topic Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <h4>Learning Links</h4>
          {learningLinks.map((l, i) => (
            <div key={i}>
              <input
                placeholder="Name"
                value={l.name}
                onChange={(e) => {
                  const copy = [...learningLinks];
                  copy[i].name = e.target.value;
                  setLearningLinks(copy);
                }}
              />
              <input
                placeholder="URL"
                value={l.url}
                onChange={(e) => {
                  const copy = [...learningLinks];
                  copy[i].url = e.target.value;
                  setLearningLinks(copy);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={() => setLearningLinks([...learningLinks, { name: "", url: "" }])}>
            + Add Learning Link
          </button>

          <h4>Practice Links</h4>
          {practiceLinks.map((p, i) => (
            <div key={i}>
              <input
                placeholder="Name"
                value={p.name}
                onChange={(e) => {
                  const copy = [...practiceLinks];
                  copy[i].name = e.target.value;
                  setPracticeLinks(copy);
                }}
              />
              <input
                placeholder="URL"
                value={p.url}
                onChange={(e) => {
                  const copy = [...practiceLinks];
                  copy[i].url = e.target.value;
                  setPracticeLinks(copy);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={() => setPracticeLinks([...practiceLinks, { name: "", url: "" }])}>
            + Add Practice Link
          </button>

          <br /><br />
          <button type="submit">Update Topic</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLearningTopic;
