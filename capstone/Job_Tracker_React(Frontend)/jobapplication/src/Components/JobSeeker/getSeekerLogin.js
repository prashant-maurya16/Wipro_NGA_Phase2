import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const JobSeekerDetail = () => {
  const navigate = useNavigate();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      console.error("No username found, user not logged in.");
      navigate("/"); // Redirect to login if user isn't logged in
      return;
    }

    setUsername(storedUsername);

    const fetchJobSeekerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5093/api/JobSeeker/username/${storedUsername}`
        );
        setJobSeeker(response.data);
      } catch (error) {
        console.error("Error fetching job seeker data:", error);
      }
    };

    fetchJobSeekerData();
  }, [navigate]);

  if (!username)
    return <div className="text-center mt-5 text-danger fw-bold">Please log in to view your profile.</div>;

  if (!jobSeeker)
    return <div className="text-center mt-5 text-warning fw-bold">Loading...</div>;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#6C757D", minHeight: "100vh", padding: "20px" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center flex-grow-1 text-white bg-dark py-2 rounded">My Profile</h2>
          <button className="btn fw-bold px-4 py-2" style={{ backgroundColor: "#FFC107", color: "#212529", borderRadius: "8px", border: "2px solid #212529" }} onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>

        <div className="card shadow-lg p-4" style={{ backgroundColor: "#F8F9FA", borderRadius: "10px" }}>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <tbody>
                <tr style={{ backgroundColor: "#212529", color: "#fff" }}>
                  <td className="fw-bold">Job Seeker ID:</td>
                  <td>{jobSeeker.jobSeekerId}</td>
                </tr>
                <tr>
                  <td className="fw-bold">First Name:</td>
                  <td>{jobSeeker.firstName}</td>
                </tr>
                <tr style={{ backgroundColor: "#212529", color: "#fff" }}>
                  <td className="fw-bold">Last Name:</td>
                  <td>{jobSeeker.lastName}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Username:</td>
                  <td>{jobSeeker.userName}</td>
                </tr>
                <tr style={{ backgroundColor: "#212529", color: "#fff" }}>
                  <td className="fw-bold">Domain:</td>
                  <td>{jobSeeker.domain}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Qualification:</td>
                  <td>{jobSeeker.qualification}</td>
                </tr>
                <tr style={{ backgroundColor: "#212529", color: "#fff" }}>
                  <td className="fw-bold">Email:</td>
                  <td>{jobSeeker.email}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Mobile:</td>
                  <td>{jobSeeker.mobile}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <button className="btn fw-bold px-4 py-2" style={{ backgroundColor: "#212529", color: "#fff", borderRadius: "8px" }} onClick={() => navigate("/")}>Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDetail;
