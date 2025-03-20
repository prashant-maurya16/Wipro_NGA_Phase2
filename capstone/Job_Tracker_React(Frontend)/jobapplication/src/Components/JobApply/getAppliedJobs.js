import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const JobSeekerAppliedJobs = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobSeekerId, setJobSeekerId] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      console.error("No username found, user not logged in.");
      navigate("/"); // Redirect to login if user isn't logged in
      return;
    }

    const fetchJobSeekerId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5093/api/JobSeeker/username/${storedUsername}`
        );
        setJobSeekerId(response.data.jobSeekerId);
      } catch (error) {
        console.error("Error fetching job seeker ID:", error);
      }
    };

    fetchJobSeekerId();
  }, [navigate]);

  useEffect(() => {
    if (jobSeekerId) {
      const fetchAppliedJobs = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5093/api/ApplyJob/jobseeker/${jobSeekerId}`
          );
          setAppliedJobs(response.data);
        } catch (error) {
          console.error("Error fetching applied jobs:", error);
        }
      };

      fetchAppliedJobs();
    }
  }, [jobSeekerId]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#6C757D", minHeight: "100vh", padding: "20px" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center flex-grow-1 text-white bg-dark py-2 rounded">Applied Jobs</h2>
          <button className="btn text-dark fw-bold" style={{ backgroundColor: "#FFC107" }} onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>

        <div className="card shadow-lg p-4" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>
          {appliedJobs.length === 0 ? (
            <div className="text-center text-danger fw-bold">No jobs applied yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="bg-dark text-white">
                  <tr>
                  
                    <th>JobSeekerId</th>
                    <th>PortalId</th>
                    <th>JobName</th>
                    <th>AppliedOn</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map((job, index) => (
                    <tr key={index}>
                     
                      <td className="text-secondary">{job.jobSeekerId}</td>
                      <td className="text-secondary">{job.portalId}</td>
                      <td className="text-secondary">{job.jobName}</td>
                      <td className="text-secondary">{new Date(job.appliedOn).toLocaleDateString()}</td>
                      <td className="text-secondary">{job.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerAppliedJobs;
