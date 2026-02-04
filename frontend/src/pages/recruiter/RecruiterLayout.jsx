import { Link } from "react-router-dom";
import { useState } from "react";

const RecruiterLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <Link to="/recruiter/dashboard">Dashboard</Link>
        <Link to="/recruiter/post-job">Post Job</Link>
        <Link to="/recruiter/view-applicants">View Applicants</Link>
        <Link to="/recruiter/profile">Update Profile</Link>
      </div>

      {/* TOP BAR */}
      <div className="topbar">
        <span className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </span>
        <h3>Recruiter Dashboard</h3>
      </div>

      {/* CONTENT */}
      <div className={`content ${open ? "shift" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default RecruiterLayout;
