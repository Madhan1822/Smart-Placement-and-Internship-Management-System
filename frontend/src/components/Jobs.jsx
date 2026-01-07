import { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
  // 1️⃣ Fetch all jobs
    axios.get("http://localhost:5000/api/jobs", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setJobs(res.data))
    .catch(err => console.log(err));

    // 2️⃣ Fetch jobs already applied by student
    axios.get("http://localhost:5000/api/applications/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setAppliedJobs(res.data.map(app => app.jobId));
    })
    .catch(err => console.log(err));

  }, [token]);


  const applyJob = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/applications/apply/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppliedJobs(prev => [...prev, id]); // 👈 update instantly
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying for job");
    }
  };


  return (
    <div className="jobs-table-container">
      <h2>Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>
                  <button
                    className="apply-btn"
                    disabled={appliedJobs.includes(job._id)}
                    onClick={() => applyJob(job._id)}
                  >
                    {appliedJobs.includes(job._id) ? "Applied" : "Apply"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Jobs;
