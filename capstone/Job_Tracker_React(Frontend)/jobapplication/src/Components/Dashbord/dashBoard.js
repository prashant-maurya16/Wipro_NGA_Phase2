import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; //Import Axios for API calls
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../NavBar/navBar";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]); //State for storing search results
  const navigate = useNavigate();

  // Function to fetch jobs from backend
  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        const response = await axios.get(`http://localhost:5093/api/JobPortal/search/${searchTerm}`);
        setJobs(response.data); // Store jobs in state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Function to apply for a job
  const handleApply = (portalId) => {
    navigate(`/jobPortal/${portalId}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <Navbar />

      {/* Search Section */}
      <div className="container-fluid py-5 bg-secondary text-center mt-5">
        <h1 className="fw-bold">Find Your Dream Job with Ease!</h1>
        <p className="lead">Explore thousands of jobs in just a few clicks.</p>
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group shadow">
                <input
                  type="text"
                  className="form-control border-0 px-3"
                  placeholder="Search for jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="btn btn-warning px-4" onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 Search Results Section */}
      <div className="container mt-4">
        {jobs.length > 0 && (
          <>
            <h3 className="text-center mb-4 text-warning">Search Results</h3>
            <div className="row g-3">
              {jobs.map((job) => (
                <div key={job.portalId} className="col-md-6 col-lg-4">
                  <div className="card text-dark shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{job.jobName}</h5>
                      <p className="card-text"><strong>Company:</strong> {job.portalName}</p>
                      <p className="card-text"><strong>Description:</strong> {job.jobDescription}</p>
                      <p className="badge bg-success">Status: {job.status}</p>
                      <button className="btn btn-warning mt-2 w-100" onClick={() => handleApply(job.portalId)}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/*  Recently Closed Jobs Section */}
      <div className="container mt-5">
        <h3 className="text-center mb-4">Recently Closed Jobs</h3>
        <div className="row g-3">
          {[
            { title: "Software Developer - Google", description: "Develop software.", status: "Closed" },
            { title: "UI/UX Designer - Microsoft", description: "Design UI.", status: "Closed" },
            { title: "Data Analyst - Amazon", description: "Analyze data.", status: "Closed" },
          ].map((job, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card text-dark shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">{job.description}</p>
                  <p className="badge bg-danger">Status: {job.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-center py-3 mt-auto">
        &copy; 2025 Job Tracker. All Rights Reserved to Prashant...
      </footer>
    </div>
  );
}
