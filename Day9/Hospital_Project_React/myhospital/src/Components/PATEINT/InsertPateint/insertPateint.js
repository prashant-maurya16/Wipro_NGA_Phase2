import React, { useState } from "react";
import axios from "axios";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const InsertPatient = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    PatientId: 0,
    PatientName: "",
    HealthProblem: "",
    DocterId: "",
    Email: "",
    MobileNo: "",
    Age: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5074/api/Patient", patient);
      setMessage("Patient added successfully!");
      setPatient({
        PatientId: 0,
        PatientName: "",
        HealthProblem: "",
        DocterId: 0,
        Email: "",
        MobileNo: "",
        Age: "",
      });
    } catch (error) {
      setMessage("Failed to add patient. Please check the details.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Menu />
      <h2>Add a New Patient</h2>
      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="PatientName" placeholder="Patient Name" value={patient.PatientName} onChange={handleChange} required />
        <input type="text" name="HealthProblem" placeholder="Health Problem" value={patient.HealthProblem} onChange={handleChange} required />
        <input type="number" name="DoctorId" placeholder="Doctor ID" value={patient.DocterId} onChange={handleChange} required />
        <input type="text" name="Email" placeholder="Email" value={patient.Email} onChange={handleChange} required />
        <input type="text" name="MobileNo" placeholder="Mobile No" value={patient.MobileNo} onChange={handleChange} required />
        <input type="number" name="Age" placeholder="Age" value={patient.Age} onChange={handleChange} required />
        <br />
        <button type="submit">Add Patient</button>
      </form>

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

export default InsertPatient;
