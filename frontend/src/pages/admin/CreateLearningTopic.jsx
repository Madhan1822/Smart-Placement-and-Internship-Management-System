import { useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const CreateLearningTopic = () => {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [learningLinks, setLearningLinks] = useState([{ name: "", url: "" }]);
  const [practiceLinks, setPracticeLinks] = useState([{ name: "", url: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/admin/learning",
      { title, learningLinks, practiceLinks },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Topic Posted");
    setTitle("");
    setLearningLinks([{ name: "", url: "" }]);
    setPracticeLinks([{ name: "", url: "" }]);
  };

  return (
    <AdminLayout>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Create Learning Topic
      </h2>

      <form onSubmit={handleSubmit}>
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

        <button
          type="button"
          onClick={() =>
            setLearningLinks([...learningLinks, { name: "", url: "" }])
          }
        >
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

        <button
          type="button"
          onClick={() =>
            setPracticeLinks([...practiceLinks, { name: "", url: "" }])
          }
        >
          + Add Practice Link
        </button>

        <br /><br />
        <button type="submit">Post Topic</button>
      </form>
    </AdminLayout>
  );
};

export default CreateLearningTopic;
