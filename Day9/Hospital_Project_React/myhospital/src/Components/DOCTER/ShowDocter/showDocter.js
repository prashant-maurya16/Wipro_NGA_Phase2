import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../../Menu/menu";
import { useNavigate } from "react-router-dom";

const ShowDoctor = () => {
    const [show, setShow] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5074/api/Doctor");
                setShow(response.data);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <Menu />
            <h2>Show Doctor</h2>
            <br />
            <hr />
            <table border="3" align="center">
                <thead>
                    <tr>
                        <th>Doctor Id</th>
                        <th>Doctor Name</th>
                        <th>Speciality</th>
                        <th>Qualification</th>
                        <th>Doctor Username</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                    </tr>
                </thead>
                <tbody>
                    {show.length > 0 ? (
                        show.map((doctor, index) => (
                            <tr key={index}>
                                <td>{doctor.doctorId}</td>
                                <td>{doctor.doctorName}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.qualification}</td>
                                <td>{doctor.doctorUserName}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.mobile}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", color: "red" }}>
                                No doctor data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

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

export default ShowDoctor;
