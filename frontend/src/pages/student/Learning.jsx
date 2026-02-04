import { useEffect, useState } from "react";
import axios from "axios";
import StudentLayout from "./StudentLayout";

const Learning = () => {
  const token = localStorage.getItem("token");

  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/learning", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setTopics(res.data));
  }, [token]);

  // 🔍 Filter topics by search text
  const filteredTopics = topics.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <StudentLayout>

      {/* PAGE HEADING */}
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Learning Topics
      </h2>

      {/* SEARCH BAR */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "320px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />
      </div>

      {/* TOPICS BUTTONS */}
      <div
        className="learning-topics"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        {filteredTopics.length > 0 ? (
          filteredTopics.map(t => (
            <button key={t._id} onClick={() => setSelected(t)}>
              {t.title}
            </button>
          ))
        ) : (
          <p style={{ color: "#6b7280" }}>No topics found</p>
        )}
      </div>

      {/* DETAILS */}
      {selected && (
        <div className="learning-details" style={{ margin: "0 auto", maxWidth: "700px" }}>
          <h3 style={{ marginBottom: "10px" }}>{selected.title}</h3>

          <h4>📘 Learning</h4>
          <ul>
            {selected.learningLinks.map((l, i) => (
              <li key={i}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>

          <h4 style={{ marginTop: "16px" }}>🧠 Practice</h4>
          <ul>
            {selected.practiceLinks.map((p, i) => (
              <li key={i}>
                <a href={p.url} target="_blank" rel="noreferrer">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

    </StudentLayout>
  );
};

export default Learning;
