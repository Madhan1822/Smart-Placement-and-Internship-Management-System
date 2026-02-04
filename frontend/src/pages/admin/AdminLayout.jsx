import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          &#9776; {/* ☰ */}
        </div>
        <h3>Admin Panel</h3>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <NavLink to="/admin/dashboard" onClick={() => setOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" onClick={() => setOpen(false)}>
          Manage Users
        </NavLink>
        <NavLink to="/admin/learning" onClick={() => setOpen(false)}>
          Post Learning
        </NavLink>
        <NavLink to="/admin/update-learning" onClick={() => setOpen(false)}>
          Update Learning
        </NavLink>
      </div>

      {/* CONTENT */}
      <div className={`content ${open ? "shift" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
