import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SubordinateLeaveHistory from "./SubordinateLeaveHistory";

const ApplyLeave = () => {
    const { empId } = useParams();
    const navigate = useNavigate();
    
    const [employee, setEmployee] = useState(null);
    const [leaveStartDate, setLeaveStartDate] = useState("");
    const [leaveEndDate, setLeaveEndDate] = useState("");
    const [noOfDays, setNoOfDays] = useState(0);
    const [leaveReason, setLeaveReason] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:5096/api/Employees/${empId}`);
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };
        fetchEmployeeData();
    }, [empId]);

    useEffect(() => {
        if (leaveStartDate && leaveEndDate) {
            let start = new Date(leaveStartDate);
            let end = new Date(leaveEndDate);
            let count = 0;

            while (start <= end) {
                if (start.getDay() !== 0) count++; // Exclude Sundays
                start.setDate(start.getDate() + 1);
            }

            setNoOfDays(count);
        }
    }, [leaveStartDate, leaveEndDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employee) {
            setErrorMessage("Employee data not loaded. Please try again.");
            return;
        }

        if (!leaveStartDate || !leaveEndDate) {
            setErrorMessage("Please select both start and end dates.");
            return;
        }

        if (noOfDays > employee.leaveAvail) {
            setErrorMessage(`You cannot apply for more than ${employee.leaveAvail} leave days.`);
            return;
        }

        try {
            await axios.post("http://localhost:5096/api/LeaveHistories", {
                empId,
                leaveStartDate,
                leaveEndDate,
                noOfDays,
                leaveReason,
                leaveStatus: "Pending",
            });

            await axios.put(`http://localhost:5096/api/Employees/updateLeaveBalance/${empId}`, noOfDays, {
                headers: { "Content-Type": "application/json" }
            });

            setSuccessMessage("Leave Applied Successfully!");
            setErrorMessage("");
            setTimeout(() => navigate(`/employDetail/${empId}`), 2000);
        } catch (error) {
            console.error("Error applying for leave:", error);
            setErrorMessage(error.response?.data?.message || "Failed to apply for leave. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary mb-4">Apply for Leave</h2>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input 
                            type="date" 
                            className="form-control"
                            value={leaveStartDate}
                            onChange={(e) => setLeaveStartDate(e.target.value)} 
                            required 
                            min={new Date().toISOString().split("T")[0]} 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={leaveEndDate}
                            onChange={(e) => setLeaveEndDate(e.target.value)} 
                            required 
                            min={leaveStartDate || new Date().toISOString().split("T")[0]} 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Leave Days (excluding Sundays)</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            value={noOfDays} 
                            readOnly
                        />
                        {noOfDays > employee?.leaveAvail && (
                            <div className="text-danger mt-1">You have only {employee.leaveAvail} leave days available.</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Reason</label>
                        <textarea 
                            className="form-control" 
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)} 
                            required
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLeave;
