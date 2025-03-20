import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaFileAlt } from "react-icons/fa";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">🏆 JobTracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/jobPortal">All Jobs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/addJob">Add Job</Link></li>
            <li className="nav-item dropdown">
              <button className="btn nav-link dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaUserCircle size={24} />
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show">
                  <li><Link className="dropdown-item" to="/jobSeekerDetail"><FaUserCircle /> Profile</Link></li>
                  <li><Link className="dropdown-item" to="/jobSeekerAppliedJob"><FaFileAlt /> Applied Jobs</Link></li>
                 
                </ul>
              )}
            </li>
            <li className="nav-item">
              <button className="btn btn-warning text-dark" onClick={() => navigate("/")}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
