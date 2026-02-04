import { useEffect, useState } from "react";
import axios from "axios";
import RecruiterApplicants from "../../components/RecruiterApplicants";
import RecruiterLayout from "./RecruiterLayout";

const ViewApplicantsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 4;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recruiter/my-jobs", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setJobs(res.data));
  }, [token]);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <RecruiterLayout>
      {/* PAGE TITLE */}
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        View Applicants
      </h2>

      {/* JOB LIST */}
      {currentJobs.map(job => (
        <div key={job._id} className="student-job-card" style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "8px" }}>{job.title}</h3>

          {/* COMPANY + LOCATION WITH GAP */}
          <p style={{ marginBottom: "16px", color: "#4b5563" }}>
            {job.company} – {job.location}
          </p>

          {/* APPLICANTS */}
          <RecruiterApplicants jobId={job._id} />
        </div>
      ))}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 14px", fontWeight: "500" }}>
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
    </RecruiterLayout>
  );
};

export default ViewApplicantsPage;
