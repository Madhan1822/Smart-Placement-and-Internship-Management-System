import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("full-time");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState({});
  const [search, setSearch] = useState("");
  const [eligibility, setEligibility] = useState({}); // ✅ ADDED

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const filtered = res.data.filter(job => job.jobType === jobType);
        setJobs(filtered);
      });

    axios
      .get("http://localhost:5000/api/applications/my", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setAppliedJobs(res.data.map(app => app.jobId._id));
      });
  }, [token, jobType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, jobType]);

  const filteredJobs = jobs.filter(job =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  // ---------------- APPLY JOB ----------------
  const applyJob = async (id) => {
    try {
      await axios.post(
        `https://smart-placement-and-internship.onrender.com/api/applications/apply/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppliedJobs(prev => [...prev, id]);
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
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
          reason: res.data.reason,
          type: res.data.type,
          missingSkills: res.data.missingSkills
        }
      }));

    } catch {
      alert("AI eligibility check failed");
    } finally {
      setLoading(prev => ({ ...prev, [jobId]: false }));
    }
  };

  return (
    <div className="jobs-table-container">
      <h2 style={{ textAlign: "center", marginBottom: "14px" }}>
        Available Jobs
      </h2>

      {/* SEARCH */}
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

      {/* JOB TYPE */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
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

      {currentJobs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No jobs available
        </p>
      ) : (
        <>
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
              {currentJobs.map(job => {
                const isApplied = appliedJobs.includes(job._id);
                const aiResult = eligibility[job._id];

                return (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.jobType}</td>

                    <td>
                      <div>

                        {!isApplied && (
                          <button
                            onClick={() => checkEligibility(job._id)}
                            disabled={loading[job._id]}
                          >
                            {loading[job._id] ? "Checking..." : "Can I Apply?"}
                          </button>
                        )}

                        {isApplied && <button disabled>Applied</button>}

                        {!isApplied && aiResult?.checked && (
                          aiResult.eligible ? (
                            <button onClick={() => applyJob(job._id)}>
                              Apply
                            </button>
                          ) : (
                            <>
                              <button disabled>❌ Not Eligible</button>

                              {/* ✅ Upgrade Skill Button */}
                              {aiResult.type === "MISSING_SKILLS" && (
                                <button
                                  style={{
                                    marginLeft: "8px",
                                    backgroundColor: "#4f46e5",
                                    color: "white",
                                    border: "none",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                  }}
                                  onClick={() =>
                                    navigate("/learning", {
                                      state: {
                                        skills: aiResult.missingSkills
                                      }
                                    })
                                  }
                                >
                                  Upgrade Your Skills 🚀
                                </button>
                              )}
                            </>
                          )
                        )}

                        {aiResult?.checked && (
                          <div style={{ marginTop: "6px", fontSize: "13px" }}>
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

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Prev
              </button>

              <span style={{ margin: "0 14px" }}>
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
