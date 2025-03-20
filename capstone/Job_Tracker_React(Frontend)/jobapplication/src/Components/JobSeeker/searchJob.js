import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";


const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/search/${searchTerm}`);
      setJobs(response.data);
      setError("");
    } catch (error) {
      setJobs([]);
      setError("No job portals found with this name.");
    }
  };

  return (
    <div className="job-search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a job (e.g., Software Engineer)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="large-input"
        />
        <button onClick={handleSearch} className="search-button">
          <FaSearch />
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {jobs.length > 0 && (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-item">
              <h3>{job.jobName}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <button className="apply-button" onClick={() => window.location.href = job.applyLink}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobSearch;
