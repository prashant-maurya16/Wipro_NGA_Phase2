import logo from './logo.svg';
import './App.css';

import ShowDocter from './Components/DOCTER/ShowDocter/showDocter';
import SearchDoctorID from './Components/DOCTER/SearchById/searchDocter';
import SearchBySpecialization from './Components/DOCTER/SpecializationDocter/specializationDocter';

import InsertDoctor from './Components/DOCTER/InsertDocter/insertDocter';
import ShowPatient from './Components/PATEINT/ShowPatient/showPatient';
import SearchPatientID from './Components/PATEINT/SearchByPatientId/searchByPatientId';

import SearchPatientByDoctorId from './Components/PATEINT/SearchByDocterId/searchByDocterId';
import SearchByHealthProblem from './Components/PATEINT/SearchByHealthProblem/searchByHealth';
import InsertPatient from './Components/PATEINT/InsertPateint/insertPateint';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Menu from './Components/Menu/menu';
import Login from './Components/Login/login';


function App() {
  return (
    <div className="App">
    { /*<ShowDocter/><hr/>
     <SearchDoctorID/>
     <hr/>
     <SearchBySpecialization/>
     <hr/>
   <InsertDoctor/>
   <hr/>
  <ShowPatient/>
  <hr/>
  <SearchPatientID/>
  <hr/>
 <SearchPatientByDoctorId/>
 <hr/>
 <SearchByHealthProblem/>
 <hr/>
 <InsertPatient/>*/}

 <BrowserRouter>
 <Routes>

  <Route path='/' element={<Login/>}/>
  <Route path='/menu' element={<Menu/>}/>
          <Route path="/showDoctor" element={<ShowDocter/>} />
          <Route path="/searchById" element={<SearchDoctorID/>} />
          <Route path="/insertDoctor" element={ <InsertDoctor/>} />
          <Route path="/searchBySpeciality" element={<SearchBySpecialization/>} />

          <Route path="/showPatient" element={<ShowPatient/>} />
          <Route path="/searchPatientById" element={ <SearchPatientID/>} />
          <Route path="/insertPatient" element={ <InsertPatient/>} />
          <Route path="/searchByHealthProblem" element={ <SearchByHealthProblem/>} />
          <Route path="/searchPatientByDoctorId" element={<SearchPatientByDoctorId/>} />
       
 </Routes>
 </BrowserRouter>

    </div>
  );
}

export default App;
