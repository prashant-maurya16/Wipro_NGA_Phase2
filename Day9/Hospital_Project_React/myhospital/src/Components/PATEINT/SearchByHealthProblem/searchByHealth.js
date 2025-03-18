import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../Menu/menu";

const SearchByHealthProblem = () => {
  const [healthProblem, setHealthProblem] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!healthProblem) {
      setError("Please enter a health problem.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5074/api/Patient/problem/${healthProblem}`
      );
      if (response.data.length === 0) {
        setError("No patients found with this health problem.");
        setPatients([]);
      } else {
        setPatients(response.data);
        setError("");
      }
    } catch (err) {
      setPatients([]);
      setError("Error fetching patients.");
    }
  };

  return (
    <div className="container">
      <Menu />
      <h2 className="title">Search Patients by Health Problem</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Health Problem"
          value={healthProblem}
          onChange={(e) => setHealthProblem(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>
      <br />
      {error && <p className="error-message">{error}</p>}

      {patients.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Health Problem</th>
              <th>Doctor ID</th>
              <th>Email</th>
              <th>Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId}>
                <td>{patient.patientId}</td>
                <td>{patient.patientName}</td>
                <td>{patient.age}</td>
                <td>{patient.healthProblem}</td>
                <td>{patient.doctorId}</td>
                <td>{patient.email}</td>
                <td>{patient.mobileNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <button
                onClick={() => navigate("/menu")}
                style={{
                    marginTop: "10px",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    cursor: "pointer",
                    display: "block",
                    margin: "20px auto",
                }}
            >
                Back to Menu
            </button>
    </div>
  );
};

export default SearchByHealthProblem;
