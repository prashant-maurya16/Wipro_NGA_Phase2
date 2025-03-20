import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login/SeekerLogin";
import JobSeekerDashboard from "./Components/JobSeeker/ShowSeeker";
import JobPortal from "./Components/JobPortal/getAllJob";
import Register from "./Components/Register/seekerRegister";
import AddJob from "./Components/JobPoster/addJob";
import JobPosterLogin from "./Components/Login/PosterLogin";
import RegisterJobPoster from "./Components/Register/posterRegiter";
import Dashboard from "./Components/Dashbord/dashBoard";
import JobSeekerDetail from "./Components/JobSeeker/getSeekerLogin";
import JobSeekerAppliedJobs from "./Components/JobApply/getAppliedJobs";





function App() {
  return (
    <Router>
    
      <Routes>
      <Route path="/" element={<Login />} />
 
      

      <Route path="/JobPosterLogin" element={<JobPosterLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/seekerDashboard" element={<JobSeekerDashboard />} />
                    <Route path="/jobPortal" element={<JobPortal />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/registerJobPoster" element={<RegisterJobPoster/>} />
                    <Route path="/jobSeekerDetail" element={<JobSeekerDetail/>} />
                    <Route path="/jobSeekerAppliedJob" element={<JobSeekerAppliedJobs/>} />
                    <Route path="/addjob" element={<AddJob/>} />
        
        
                    
                    
                 
      </Routes>
    </Router>
  );
}

export default App;