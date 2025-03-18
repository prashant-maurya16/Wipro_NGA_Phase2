
import './App.css';
import Login from './Components/Login/login';
import AuthService from './Components/AuthService/authService';
import Admin from './Components/Admin/admin';

function App() {
  return (
    <div className="App">
     <Login/>
     <hr/>
     <Admin/>
    
    </div>
  );
}

export default App;
