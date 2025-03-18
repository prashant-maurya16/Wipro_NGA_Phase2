import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SubordinateLeaveHistory from "./SubordinateLeaveHistory";

const LeaveHistory = () => {
    const { empId } = useParams();
    const navigate = useNavigate(); // ✅ Fix: Initialize navigate
    const [leaveHistory, setLeaveHistory] = useState([]);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5096/api/LeaveHistories/ByEmployee/${empId}`);
                setLeaveHistory(response.data);
            } catch (error) {
                console.error("Error fetching leave history:", error);
            }
        };
        fetchLeaveHistory();
    }, [empId]);

    return (
        <div className="mt-4">
            <h3 className="text-center text-success">Leave History</h3>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Leave ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>No. of Days</th>
                            <th>Status</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.length > 0 ? (
                            leaveHistory.map((leave) => (
                                <tr key={leave.leaveId}>
                                    <td>{leave.leaveId}</td>
                                    <td>{leave.leaveStartDate}</td>
                                    <td>{leave.leaveEndDate}</td>
                                    <td>{leave.noOfDays}</td>
                                    <td>{leave.leaveStatus}</td>
                                    <td>{leave.leaveReason}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No leave records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Show Subordinate Leave History if Employee is a Manager */}
          
            </div>

            {/* Apply Leave Button */}
            <button 
                className="btn btn-success mt-3" 
                onClick={() => navigate(`/applyLeave/${empId}`)} // ✅ Fix: navigate is now defined
            >
                Apply Leave
            </button>
            <SubordinateLeaveHistory mgrId={empId} />
        </div>
    );
};

export default LeaveHistory;