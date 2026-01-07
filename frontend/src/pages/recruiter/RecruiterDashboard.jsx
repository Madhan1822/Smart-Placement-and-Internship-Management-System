import { useEffect, useState } from "react";
import axios from "axios";
import RecruiterApplicants from "../../components/RecruiterApplicants";

const RecruiterDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchMyJobs = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/recruiter/my-jobs",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setJobs(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/recruiter/job",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Job created successfully");
      setForm({ title: "", company: "", location: "", description: "" });
      fetchMyJobs(); // refresh jobs
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

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

      <hr />

      <h2>My Jobs</h2>

      {jobs.map(job => (
        <div key={job._id} style={{ marginBottom: "30px" }}>
          <h3>{job.title}</h3>
          <p>{job.company} – {job.location}</p>

          {/* ✅ THIS IS REQUIRED */}
          <RecruiterApplicants jobId={job._id} />
        </div>
      ))}
    </div>
  );
};

export default RecruiterDashboard;
