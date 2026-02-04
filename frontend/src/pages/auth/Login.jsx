import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (!res.data.user) {
        setError("Login failed: invalid response from server");
        return;
      }

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      // ✅ CORRECT REDIRECTS
      switch (res.data.user.role) {
        case "student":
          navigate("/student/dashboard");
          break;
        case "recruiter":
          navigate("/recruiter/dashboard");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          setError("Invalid role");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="auth-page">
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>

        {error && <div className="auth-error">{error}</div>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign in</button>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  </div>
);

};

export default Login;
