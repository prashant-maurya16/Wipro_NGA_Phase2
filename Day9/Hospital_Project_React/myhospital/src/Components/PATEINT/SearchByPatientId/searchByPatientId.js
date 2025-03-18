import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const SearchPatientID = () => {
  const [patient, setPatientData] = useState({});
  const [patientId, SetPateintId] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    SetPateintId(event.target.value);
  };

  const show = () => {
    let pid = parseInt(patientId);
    axios.get(`http://localhost:5074/api/Patient/${pid}`).then((response) => {
      setPatientData(response.data);
    });
  };

  return (
    <div className="container">
      <Menu />
      <h2 className="title">Search Patient</h2>

      <div className="search-box">
        <label>Patient ID:</label>
        <input
          type="number"
          name="patientId"
          value={patientId}
          onChange={handleChange}
          className="input-field"
        />
        <button onClick={show} className="search-btn">
          Show
        </button>
      </div>

      <hr />
      {patient.patientId ? (
        <div className="patient-info">
          <p>Patient Id: <b>{patient.patientId}</b></p>
          <p>Patient Name: <b>{patient.patientName}</b></p>
          <p>Health Problem: <b>{patient.healthProblem}</b></p>
          <p>Doctor ID: <b>{patient.doctorId}</b></p>
          <p>Email: <b>{patient.email}</b></p>
          <p>Mobile No: <b>{patient.mobileNo}</b></p>
          <p>Age: <b>{patient.age}</b></p>
        </div>
      ) : (
        <p>No patient data found.</p>
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

export default SearchPatientID;
