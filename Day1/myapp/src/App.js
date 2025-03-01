
import './App.css';

import First from './components/first/first';
import Second from './components/second/second';
import Third from './components/third/third';
import ButtonEx from './components/buttonex/ButtonEx';
import Four from './components/four/four';
import Five from './components/five/five';
import Counter from './components/counter/counter';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Menu from './components/menu/menu';
import Change from './components/change/change';
import Login from './components/login/login';

function App() {
  return (
    <div className="App">
        Welcome to Functional Component......Prashant <br/>
   { /* <First /> <br/>
     <Second /> <br/>
     <Third firstName="Prashant" lastName="Kumar" company="Wipro" /> <br/> 
     <Four />
     <ButtonEx /> <hr/>
     <Five /><br/>
     <counter/>*/}

     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path="/first" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third firstName="prashant" lastName="kumar" company="Wipro" />} />
        <Route path="/four" element={<Four />} />
        <Route path="/five" element={<Five />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/buttonEx" element={<ButtonEx />} />
        <Route path="/change" element={<Change />} />


     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
