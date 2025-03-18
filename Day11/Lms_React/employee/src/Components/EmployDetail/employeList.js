import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5096/api/Employees");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Employee List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Emp Id</th>
                            <th>Employee Name</th>
                            <th>Manager Id</th>
                            <th>Leave Available</th>
                            <th>Date Of Birth</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Employee Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((item) => (
                            <tr key={item.empId}>
                                <td>{item.empId}</td>
                                <td>{item.employName}</td>
                                <td>{item.mgrId || "No Manager"}</td>
                                <td>{item.leaveAvail}</td>
                                <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => navigate(`/employDetail/${item.empId}`)}
                                    >
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;