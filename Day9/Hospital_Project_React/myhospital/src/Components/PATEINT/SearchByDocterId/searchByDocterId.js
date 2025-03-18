import React, { useState } from "react";
import axios from "axios";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const SearchPatientByDoctorId = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!doctorId) {
      setError("Please enter a Doctor ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5074/api/Patient/doctor/${doctorId}`
      );
      if (response.data.length === 0) {
        setError("No patients found for this Doctor ID.");
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
      <h2 className="title">Search Patients by Doctor ID</h2>

      <div className="search-box">
        <input
          type="number"
          placeholder="Enter Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
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
      <br />
      {/* Back to Menu Button */}
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

export default SearchPatientByDoctorId;
