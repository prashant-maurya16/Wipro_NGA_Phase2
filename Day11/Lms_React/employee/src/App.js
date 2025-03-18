import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeList from './Components/EmployDetail/employeList';
import EmployeeDetail from './Components/EmployDetail/employDetail';
import ApplyLeave from './Components/EmployDetail/LeaveApply';


function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<EmployeeList />} />
     
     <Route path="/employDetail/:empId" element={<EmployeeDetail/>} />
     <Route path="/applyLeave/:empId" element={<ApplyLeave/>} />


     
     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;