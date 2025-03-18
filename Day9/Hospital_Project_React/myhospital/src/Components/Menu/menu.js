import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data if stored (e.g., localStorage/sessionStorage)
    localStorage.removeItem("token"); // Adjust this based on how authentication is handled

    // Redirect to login page
    navigate("/");
  };

  return (
    <div>
      <h2>My Hospital...</h2>

      <Link to="/showDoctor">ShowDoctor</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/searchById">Search ById</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/insertDoctor">InsertDoctor</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/searchBySpeciality">Search By Specialization</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;

      <Link to="/showPatient">ShowPatient</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/searchPatientById">Search Patient ById</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/insertPatient">InsertPatient</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/searchByHealthProblem">Search By HealthProblem</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link to="/searchPatientByDoctorId">Search By DoctorId</Link>
      &nbsp; &nbsp; &nbsp; &nbsp;

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        style={{
          marginLeft: "20px",
          padding: "8px 16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
