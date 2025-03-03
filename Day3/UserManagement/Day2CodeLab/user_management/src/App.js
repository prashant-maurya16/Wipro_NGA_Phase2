
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import UserInsert from './Components/UserAdd/userAdd';
import UserSearch from './Components/UserSearch/userSearch';
import UserShow from './Components/UserShow/userShow';
import Menu from './Components/Menu/menu';

function App() {
  return (
    <div className="App">
     {/*<UserShow/>
     <hr/>
     <UserSearch/>
     <hr/>
     <UserInsert/>*/}
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Menu />} />
        <Route path="/userShow" element={<UserShow />} />
        <Route path="/userSearch" element={<UserSearch />} />
        <Route path="/userInsert" element={<UserInsert />} />

     </Routes>
     </BrowserRouter>    </div>
  );
}

export default App;
