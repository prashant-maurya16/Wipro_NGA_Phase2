import React, { useState, useEffect } from "react";
import axios from "axios";
import JobPortal from "../JobPortal/getAllJob";
import JobSearch from "./searchJob";


const JobSeekerDashboard = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  useEffect(() => {
    // Fetch job portal details
    axios
      .get("/api/jobs", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs", error));
  }, [token]);

  const fetchAppliedJobs = () => {
    axios
      .get("/api/applied-jobs", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setAppliedJobs(response.data);
        setShowAppliedJobs(true);
      })
      .catch((error) => console.error("Error fetching applied jobs", error));
  };

  return (
    <div className="flex h-screen">
      <JobSearch/>
     
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={fetchAppliedJobs}
        >
          View Applied Jobs
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {!showAppliedJobs ? (
          <>
            <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
            <ul>
              {jobs.map((job) => (
                <li key={job.id} className="border p-2 mb-2 rounded">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p>{job.description}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">My Applied Jobs</h2>
            <ul>
              {appliedJobs.map((job) => (
                <li key={job.id} className="border p-2 mb-2 rounded">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p>Status: {job.status}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <JobPortal/>
    </div>
  );
};

export default JobSeekerDashboard;
