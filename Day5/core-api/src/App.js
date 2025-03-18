
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import EmployShow from './Components/EmployShow/employShow';
import EmploySearch from './Components/EmploySearch/employSearch';
import EmployInsert from './Components/EmployInsert/employInsert';
import Menu from './Components/Menu/menu';

function App() {
  return (
    <div className="App">
    { /*<EmployShow/>
     <br/>
     <br/>
     <EmploySearch/>
     <br/>
     <br/>
     <EmployInsert/>*/}
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Menu />} />
     <Route path="/employShow" element={<EmployShow />} />
     <Route path="/employSearch" element={<EmploySearch />} />
     <Route path="/employInsert" element={<EmployInsert />} />

     </Routes>
     
     
     </BrowserRouter>


    </div>
  );
}

export default App;
