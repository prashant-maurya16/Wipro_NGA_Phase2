import React, { useEffect, useState } from "react";
import axios from "axios";

const SubordinateLeaveHistory = ({ mgrId }) => {
    const [subordinateLeaves, setSubordinateLeaves] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchSubordinateLeaves = async () => {
            try {
                const response = await axios.get(`http://localhost:5096/api/LeaveHistories/PendingSubordinates/${mgrId}`);
                setSubordinateLeaves(response.data);
            } catch (error) {
                console.error("Error fetching subordinate leave history:", error);
                setErrorMessage("Failed to fetch subordinate leave history.");
            }
        };

        fetchSubordinateLeaves();
    }, [mgrId]);

    return (
        <div className="mt-4">
            <h4 className="text-primary">Manager's Subordinate Leave History</h4>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            
            {subordinateLeaves.length === 0 ? (
                <p className="text-muted">No pending leave requests from subordinates.</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                        <th>Leave ID</th>
                            <th>Employee ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>No. of Days</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subordinateLeaves.map((leave) => (
                            <tr key={leave.id}>
                              <td>{leave.leaveId}</td>
                                <td>{leave.empId}</td>
                                <td>{leave.leaveStartDate}</td>
                                <td>{leave.leaveEndDate}</td>
                                <td>{leave.noOfDays}</td>
                                <td>{leave.leaveReason}</td>
                                <td className="text-warning">{leave.leaveStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SubordinateLeaveHistory;
