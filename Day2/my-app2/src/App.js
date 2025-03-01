
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First from './component/first/first';
import Second from './component/second/second';
import Third from './component/third/third';
import Calc from './component/calc/calc';
import Login from './component/login/login';
import Menu from './component/menu/menu';

function App() {
  return (
    <div className="App">
     { /*<First/>
     <Second/>
     <Third/>
     <Calc/>
     <Login/>*/}
<BrowserRouter>

<Routes>
<Route path='/' element={<Menu/>}/>
<Route path="/first" element={<First />} />
<Route path="/second" element={<Second />} />
<Route path="/third" element={<Third />} />
<Route path="/calc" element={<Calc />} />
<Route path="/login" element={<Login />} />

</Routes>
</BrowserRouter>


    </div>
  );
}

export default App;
