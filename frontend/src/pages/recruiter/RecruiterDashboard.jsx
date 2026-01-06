import { useState } from "react";
import axios from "axios";

const RecruiterDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/recruiter/job",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Job created successfully");
      setForm({ title: "", company: "", location: "", description: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="dashboard">
      <h2>Create Job</h2>

      <form className="job-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} />
        <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default RecruiterDashboard;
