import React, { useState } from "react";
import axios from "axios";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const InsertDoctor = () => {
  const [doctor, setDoctor] = useState({
    doctorName: "",
    speciality: "",
    qualification: "",
    doctorUserName: "",
    doctorPassword: "",
    email: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5074/api/Doctor", doctor);
      setMessage("Doctor added successfully!");
      setDoctor({
        doctorName: "",
        speciality: "",
        qualification: "",
        doctorUserName: "",
        doctorPassword: "",
        email: "",
        mobile: "",
      });
    } catch (error) {
      setMessage("Failed to add doctor. Please check the details.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Menu/>
      
      <h2>Add a New Doctor</h2>
      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="doctorName" placeholder="Doctor Name" value={doctor.doctorName} onChange={handleChange} required />

        <select name="speciality" value={doctor.speciality} onChange={handleChange} required>
          <option value="">Select Specialization</option>
          <option value="CARDIO">Cardiology</option>
          <option value="KIDNEY">Nephrology (Kidney)</option>
          <option value="LIVER">Hepatology (Liver)</option>
          <option value="GENERAL">General Physician</option>
          <option value="ENT">Ear, Nose, Throat (ENT)</option>
        </select>

        <input type="text" name="qualification" placeholder="Qualification" value={doctor.qualification} onChange={handleChange} required />
        <input type="text" name="doctorUserName" placeholder="Username" value={doctor.doctorUserName} onChange={handleChange} required />
        <input type="password" name="doctorPassword" placeholder="Password" value={doctor.doctorPassword} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={doctor.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile Number" value={doctor.mobile} onChange={handleChange} required />
        <br/>

        <button type="submit">Add Doctor</button>
        
        {/* Back to Menu Button */}
        <br/>  <br/>  <br/>
        <button type="button" onClick={() => navigate("/menu")} style={{ marginLeft: "10px", backgroundColor: "blue", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}>
          Back to Menu
        </button>
      </form>
      
    </div>
  );
};

export default InsertDoctor;
