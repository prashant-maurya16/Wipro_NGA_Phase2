import React, { useState } from "react";
import authService from "../AuthService/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ doctorUserName: "", doctorPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const jwtToken = await authService.login(data.doctorUserName, data.doctorPassword);
      
      if (jwtToken) {
        setToken(jwtToken);
        localStorage.setItem("token", JSON.stringify(jwtToken));
        alert(`✅ Login Successful!\n\n🔑 JWT Token: ${jwtToken}`);
      } else {
        setError("❌ Failed to generate token.");
      }
    } catch (err) {
      setError("❌ Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async () => {
    try {
      const storedToken = JSON.parse(localStorage.getItem("token"));

      if (!storedToken) {
        setError("❌ No token found. Please log in first.");
        return;
      }

      const response = await axios.get("http://localhost:5074/api/Protected", {
        headers: { Authorization: "Bearer " + storedToken }
      });

      if (response.status === 200) {
        alert("✅ Token is valid! Navigating to menu...");
        navigate("/menu");
      }
    } catch (err) {
      setError("❌ Invalid token. Please log in again.");
      localStorage.removeItem("token"); // Remove invalid token
      setToken(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md-6 mx-auto">
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="doctorUserName"
              value={data.doctorUserName}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="doctorPassword"
              value={data.doctorPassword}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {token && (
            <button
              type="button"
              className="btn btn-success w-100 mt-3"
              onClick={validateToken}
            >
              Validate Token
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
