import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>SMART PLACEMENT & INTERNSHIP MANAGEMENT SYSTEM</h1>
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
};

export default Header;
