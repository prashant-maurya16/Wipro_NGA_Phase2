import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LeaveHistory from "./LeaveHistory";

const EmployeeDetail = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5096/api/Employees/${empId}`);
        setEmployee(response.data);

        if (response.data.mgrId) {
          try {
            const managerResponse = await axios.get(`http://localhost:5096/managereId/${response.data.mgrId}`);
            setManager(managerResponse.data);
          } catch (error) {
            console.error("Error fetching manager:", error);
            setManager(null);
          }
        } else {
          setManager(null);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployeeData();
  }, [empId]);

  if (!employee) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      {/* Top Section with Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center flex-grow-1 text-primary">Employee & Manager Details</h2>
        
        {/* Back Button */}
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      {/* Employee and Manager Details */}
      <div className="card shadow-lg p-4">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Employee Information</th>
                <th className="text-center">Manager Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ID:</strong> {employee.empId}</td>
                <td><strong>ID:</strong> {manager ? manager.empId : "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Name:</strong> {employee.employName}</td>
                <td><strong>Name:</strong> {manager ? manager.employName : "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Leave Available:</strong> {employee.leaveAvail}</td>
                <td><strong>Leave Available:</strong> {manager ? manager.leaveAvail : "N/A"}</td>
              </tr>
              <tr>
                <td><strong>DOB:</strong> {new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                <td><strong>DOB:</strong> {manager ? new Date(manager.dateOfBirth).toLocaleDateString() : "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong> {employee.email}</td>
                <td><strong>Email:</strong> {manager ? manager.email : "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Mobile:</strong> {employee.mobile}</td>
                <td><strong>Mobile:</strong> {manager ? manager.mobile : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave History Section Below */}
      <div className="mt-4">
        <LeaveHistory />
      </div>
    </div>
  );
};

export default EmployeeDetail;
