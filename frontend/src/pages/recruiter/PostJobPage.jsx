import { useState } from "react";
import axios from "axios";
import RecruiterLayout from "./RecruiterLayout";

const PostJobPage = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills: "",
    minCGPA: "",
    experience: "",
    jobType: "full-time"
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      jobType: form.jobType,
      requirements: {
        skills: form.skills
          ? form.skills.split(",").map(s => s.trim())
          : [],
        minCGPA: Number(form.minCGPA) || 0,
        experience: form.experience || ""
      }
    };

    try {
      await axios.post("http://localhost:5000/api/jobs", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Job posted successfully");

      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        skills: "",
        minCGPA: "",
        experience: "",
        jobType: "full-time"
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <RecruiterLayout>
      {/* CENTERED TITLE */}
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Post a New Job
      </h2>

      {/* FORM */}
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
        >
          <option value="full-time">Full-Time</option>
          <option value="internship">Internship</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          name="minCGPA"
          type="number"
          placeholder="Minimum CGPA"
          value={form.minCGPA}
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Experience Required"
          value={form.experience}
          onChange={handleChange}
        />

        {/* CENTERED BUTTON */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button type="submit">Post Job</button>
        </div>
      </form>
    </RecruiterLayout>
  );
};

export default PostJobPage;
