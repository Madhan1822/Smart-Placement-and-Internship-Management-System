import { useState } from "react";
import { Link } from "react-router-dom";
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
    experience: ""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      company: form.company,
      location: form.location,
      description: form.description,
      requirements: {
        skills: form.skills.split(",").map(s => s.trim()),
        minCGPA: Number(form.minCGPA),
        experience: form.experience
      }
    };

    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Job created successfully");
      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        skills: "",
        minCGPA: "",
        experience: ""
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <RecruiterLayout>
    <div className="dashboard">
      <div className="recruiter-nav">
        <Link to="/recruiter/post-job">Post Job</Link>
        <Link to="/recruiter/view-applicants">View Applicants</Link>
        <Link to="/recruiter/profile">Profile</Link>
      </div>

      <h2>Post Job</h2>

      <form className="job-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} />
        <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} />

        <input
          name="skills"
          placeholder="Required Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          name="minCGPA"
          type="number"
          step="0.1"
          placeholder="Minimum CGPA"
          value={form.minCGPA}
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Experience (eg: 0-2 years)"
          value={form.experience}
          onChange={handleChange}
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
    </RecruiterLayout>
  );
};

export default PostJobPage;
