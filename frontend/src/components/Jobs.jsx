import { useEffect, useState } from "react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("full-time");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [eligibility, setEligibility] = useState({});
  const [loading, setLoading] = useState({});
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch jobs
    axios
      .get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const filteredJobs = res.data.filter(
          job => job.jobType === jobType
        );
        setJobs(filteredJobs);
      });

    // Fetch applied jobs
    axios
      .get("http://localhost:5000/api/applications/my", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setAppliedJobs(res.data.map(app => app.jobId._id));
      });
  }, [token, jobType]);

  // 🔍 SEARCH FILTER
  const filteredJobs = jobs.filter(job =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ---------------- APPLY JOB ----------------
  const applyJob = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/applications/apply/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppliedJobs(prev => [...prev, id]);
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying for job");
    }
  };

  // ---------------- AI ELIGIBILITY ----------------
  const checkEligibility = async (jobId) => {
    try {
      setLoading(prev => ({ ...prev, [jobId]: true }));

      const res = await axios.post(
        "http://localhost:5000/api/ai/check-eligibility-ai",
        { jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEligibility(prev => ({
        ...prev,
        [jobId]: {
          checked: true,
          eligible: res.data.eligible,
          reason: res.data.reason
        }
      }));
    } catch (err) {
      alert("AI eligibility check failed");
    } finally {
      setLoading(prev => ({ ...prev, [jobId]: false }));
    }
  };

  return (
    <div className="jobs-table-container">

      {/* CENTERED HEADER */}
      <h2 style={{ textAlign: "center", marginBottom: "14px" }}>
        Available Jobs
      </h2>

      {/* SEARCH BAR */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title, company, location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "360px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db"
          }}
        />
      </div>

      {/* JOB TYPE TOGGLE – CENTERED */}
      <div
        className="job-type-toggle"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "24px"
        }}
      >
        <button
          onClick={() => setJobType("full-time")}
          disabled={jobType === "full-time"}
        >
          Full-Time
        </button>

        <button
          onClick={() => setJobType("internship")}
          disabled={jobType === "internship"}
        >
          Internship
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No jobs available
        </p>
      ) : (
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map(job => {
              const isApplied = appliedJobs.includes(job._id);
              const aiResult = eligibility[job._id];

              return (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.jobType === "full-time" ? "Full-Time" : "Internship"}</td>

                  <td>
                    <div className="job-action">

                      {!isApplied && (
                        <button
                          className="eligibility-btn"
                          onClick={() => checkEligibility(job._id)}
                          disabled={loading[job._id]}
                        >
                          {loading[job._id] ? "Checking..." : "Can I Apply?"}
                        </button>
                      )}

                      {isApplied && (
                        <button className="apply-btn" disabled>
                          Applied
                        </button>
                      )}

                      {!isApplied && aiResult?.checked && (
                        aiResult.eligible ? (
                          <button
                            className="apply-btn"
                            onClick={() => applyJob(job._id)}
                          >
                            Apply
                          </button>
                        ) : (
                          <button className="apply-btn" disabled>
                            ❌ Not Eligible
                          </button>
                        )
                      )}

                      {aiResult?.checked && (
                        <div
                          className={`eligibility-text ${
                            aiResult.eligible ? "yes" : "no"
                          }`}
                        >
                          {aiResult.reason}
                        </div>
                      )}

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Jobs;
