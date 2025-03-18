import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5108/api/Customers");
      const customers = response.data;

      const user = customers.find(
        (cust) => cust.custUserName === username && cust.custPassword === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login Successful!");
        navigate("/customerInfo");
      } else {
        alert("Invalid Username or Password!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to connect to server");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {/* {error && <p className="error-message">{error}</p>} */}
      </form>
    </div>
  );
};

export default Login;