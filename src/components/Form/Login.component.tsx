import { useContext, useState } from "react";
import { AuthContext } from "../../providers/authProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "", role: "doctor" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");

      login(result.user);
      navigate(result.user.role === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");

    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
              name="username"
              type="text"
              placeholder="Email"
              value={formData.username}
              onChange={handleChange}
              required
          />
          <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
  );
};

export default Login;
