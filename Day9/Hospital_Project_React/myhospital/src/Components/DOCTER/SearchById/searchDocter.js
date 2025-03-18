import { useState } from "react";
import axios from "axios";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const SearchDoctorID = () => {
    const [doctor, setDoctorData] = useState({});
    const [doctorId, setDoctorId] = useState(0);
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (event) => {
        setDoctorId(event.target.value);
    };

    const show = () => {
        let eid = parseInt(doctorId);
        axios.get(`http://localhost:5074/api/Doctor/${eid}`).then((response) => {
            setDoctorData(response.data);
        }).catch(error => {
            console.error("Error fetching doctor data:", error);
            setDoctorData({});
        });
    };

    return (
        <div className="container">
            <Menu />
            <h2>Search Doctor</h2>
            
            <label>Doctor ID: </label>
            <input 
                type="number" 
                name="doctorId" 
                value={doctorId} 
                onChange={handleChange} 
                placeholder="Enter Doctor ID"
            /> 
            <br />
            
            <button onClick={show} style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
                Show
            </button>
            
            <hr />
            {doctor.doctorId ? (
                <>
                    <p>Doctor Id: <b>{doctor.doctorId}</b></p>
                    <p>Doctor Name: <b>{doctor.doctorName}</b></p>
                    <p>Speciality: <b>{doctor.speciality}</b></p>
                    <p>Qualification: <b>{doctor.qualification}</b></p>
                    <p>Doctor UserName: <b>{doctor.doctorUserName}</b></p>
                    <p>Email: <b>{doctor.email}</b></p>
                    <p>Mobile: <b>{doctor.mobile}</b></p>
                </>
            ) : (
                <p style={{ color: "red" }}>No doctor found with the given ID.</p>
            )}
            
            <br />

            {/* Back to Menu Button */}
            <button 
                onClick={() => navigate("/menu")} 
                style={{ marginTop: "10px", backgroundColor: "blue", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}
            >
                Back to Menu
            </button>
        </div>
    );
};

export default SearchDoctorID;
