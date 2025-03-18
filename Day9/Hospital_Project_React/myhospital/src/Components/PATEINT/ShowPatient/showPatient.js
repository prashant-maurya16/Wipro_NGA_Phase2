import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ShowPatient = () => {
    const [show, setShow] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5074/api/Patient");
                setShow(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
          
            <h2 className="title">All Patients</h2>
            <br />
            <hr />
            <table border="1" cellPadding="10" align="center">
                <thead>
                    <tr>
                        <th>Patient Id</th>
                        <th>Patient Name</th>
                        <th>Health Problem</th>
                        <th>Doctor Id</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {show.map((patient) => (
                        <tr key={patient.patientId}>
                            <td>{patient.patientId}</td>
                            <td>{patient.patientName}</td>
                            <td>{patient.healthProblem}</td>
                            <td>{patient.doctorId}</td>
                            <td>{patient.email}</td>
                            <td>{patient.mobileNo}</td>
                            <td>{patient.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
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

export default ShowPatient;
