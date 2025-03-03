
import './App.css';

import { BrowserRouter, Routes,Route } from "react-router-dom";
import UserShow from './component/UserShow/userShow';
import PostShow from './component/PostShow/postShow';
import EmployShow from './component/EmplShow/emplShow';
import UserSearch from './component/UserSearch/userSearch';
import EmploySearch from './component/EmplSearch/emplSearch';
import PostSearch from './component/PostSearch/postSearch';
import EmployInsert from './component/EmployInsert/employInsert';
import Menu from './component/Menu/menu';
import UserInsert from './component/UserInsert/userInsert';
import Login from './component/Login/login';

function App() {
  return (
    <div className="App">

     
    {/* <UserShow/><hr/>
     <PostShow/><hr/>
     <EmplShow/><hr/>
     <UserSearch/><hr/>
     <EmploySearch/><hr/>
     <PostSearch/><hr/>
     <EmployInsert/>*/}

     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/menu' element={<Menu/>}/>
      <Route path="/userShow" element={<UserShow />} />
        <Route path="/employShow" element={<EmployShow />} />
        <Route path="/postShow" element={<PostShow />} />
        <Route path="/userSearch" element={<UserSearch />} />
        <Route path="/emplSearch" element={<EmploySearch />} />
        <Route path="/postSearch" element={<PostSearch />} />
        <Route path="/employInsert" element={<EmployInsert />} />
        <Route path="/userInsert" element={<UserInsert />} />
        


     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
