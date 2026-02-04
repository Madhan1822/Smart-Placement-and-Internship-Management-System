import { Link } from "react-router-dom";
import { useState } from "react";

const StudentLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <Link to="/student/dashboard">Available Jobs</Link>
        <Link to="/student/profile">Update Profile</Link>
        <Link to="/student/applied-jobs">Applied Jobs</Link>
        <Link to="/learning">Learning</Link>
      </div>

      {/* TOP BAR */}
      <div className="topbar">
        <span className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </span>
        <h3>Student Dashboard</h3>
      </div>

      {/* CONTENT */}
      <div className={`content ${open ? "shift" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;
