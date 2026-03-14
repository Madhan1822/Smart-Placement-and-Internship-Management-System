import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StudentLayout from "./StudentLayout";

const Learning = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // 🔥 Skills passed from Jobs page
  const recommendedSkills = location.state?.skills || [];

  const [topics, setTopics] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/learning", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setTopics(res.data);

        // 🔥 AUTO SELECT FIRST MATCHING TOPIC
        if (recommendedSkills.length > 0) {
          const match = res.data.find(topic =>
            recommendedSkills.some(skill =>
              topic.title.toLowerCase().includes(skill.toLowerCase())
            )
          );

          if (match) {
            setSelected(match);
          }
        }
      })
      .catch(err => console.log(err));
  }, [token, recommendedSkills]);

  // 🔍 Filter topics
  const filteredTopics = topics.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 Check recommended
  const isRecommended = (topic) => {
    return recommendedSkills.some(skill =>
      topic.title.toLowerCase().includes(skill.toLowerCase())
    );
  };

  return (
    <StudentLayout>

      {/* PAGE HEADING */}
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Learning Topics
      </h2>

      {/* 🔥 RECOMMENDATION BANNER */}
      {recommendedSkills.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
            background: "linear-gradient(135deg, #1e3cfa, #3a0ca3)",
            color: "#fff",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "500"
          }}
        >
          ⭐ Recommended topics based on missing skills:{" "}
          {recommendedSkills.join(", ")}
        </div>
      )}

      {/* SEARCH BAR */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "320px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            outline: "none"
          }}
        />
      </div>

      {/* TOPIC BUTTONS */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        {filteredTopics.length > 0 ? (
          filteredTopics.map(t => {
            const recommended = isRecommended(t);
            const isSelected = selected?._id === t._id;

            return (
              <button
                key={t._id}
                onClick={() => setSelected(t)}
                style={{
                  margin: "8px",
                  padding: "10px 22px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "15px",
                  color: "#ffffff",
                  background: recommended
                    ? "linear-gradient(135deg, #1e3cfa, #3a0ca3)"
                    : "linear-gradient(135deg, #2563eb, #1e40af)",
                  boxShadow: isSelected
                    ? "0 6px 20px rgba(30, 60, 250, 0.5)"
                    : "0 3px 10px rgba(0,0,0,0.1)",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s ease"
                }}
              >
                {t.title}
                {recommended && " ⭐"}
              </button>
            );
          })
        ) : (
          <p style={{ color: "#6b7280" }}>No topics found</p>
        )}
      </div>

      {/* DETAILS SECTION */}
      {selected && (
        <div
          style={{
            margin: "0 auto",
            maxWidth: "750px",
            backgroundColor: "#f9fafb",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>{selected.title}</h3>

          <h4>📘 Learning</h4>
          <ul>
            {selected.learningLinks.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>

          <h4 style={{ marginTop: "20px" }}>🧠 Practice</h4>
          <ul>
            {selected.practiceLinks.map((p, i) => (
              <li key={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
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
