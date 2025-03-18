import { useState } from "react";
import axios from "axios";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const SearchBySpecialization = () => {
    const [doctor, setDoctorData] = useState([]);  // Handling multiple doctors
    const [doctorSpeciality, setDoctorSpeciality] = useState(""); 
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (event) => {
        setDoctorSpeciality(event.target.value);
    };

    const show = () => {
        let special = doctorSpeciality.toUpperCase();  // Convert input to uppercase
        axios.get(`http://localhost:5074/api/Doctor/specialization/${special}`)
            .then((response) => {
                setDoctorData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setDoctorData([]);  // Reset in case of error
            });
    };

    return (
        <div className="container">
            <Menu />
            <h2>Search Doctor By Specialization</h2>

            <label>Speciality: </label>
            <input
                type="text"
                name="speciality"
                value={doctorSpeciality}
                onChange={handleChange}
            />
            <br />
            <input type="button" value="Show" onClick={show} />
            <hr />

            {/* Check if doctor data is available before displaying */}
            {doctor.length > 0 ? (
                doctor.map((doc) => (
                    <div key={doc.doctorId} style={{ border: "1px solid black", padding: "10px", margin: "10px 0" }}>
                        <p>Doctor Id: <b>{doc.doctorId}</b></p>
                        <p>Doctor Name: <b>{doc.doctorName}</b></p>
                        <p>Speciality: <b>{doc.speciality}</b></p>
                        <p>Qualification: <b>{doc.qualification}</b></p>
                        <p>Doctor UserName: <b>{doc.doctorUserName}</b></p>
                        <p>Email: <b>{doc.email}</b></p>
                        <p>Mobile: <b>{doc.mobile}</b></p>
                    </div>
                ))
            ) : (
                <p style={{ color: "red" }}>No doctor found.</p>
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

export default SearchBySpecialization;
