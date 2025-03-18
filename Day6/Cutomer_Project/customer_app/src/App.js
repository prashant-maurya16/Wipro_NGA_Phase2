import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";




import CustomerInsert from './Components/CutomerInsert/customerInsert';
import CustomerInfo from './Components/CustomerInfo/customerInfo';
import Menu from './Components/Menu/menu';
import CustomerShow from './Components/CustomerShow/customerShow';
import Login from './Components/Login/login';
import WalletShow from './Components/WalletShow/walletShow';
import MenuShow from './Components/ShowMenu/showMenu';

function App() {
  return (
    <div className="App">
      {/*<CustomerShow/>
      <br/>
      <CustomerInsert/>
      <br/>
      <CustomerInfo/>*/}
      <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
          <Route path="/customerInfo" element={<CustomerInfo />} />
          <Route path="/customerShow" element={<CustomerShow />} />
          <Route path="/customerInsert" element={<CustomerInsert />} />
          <Route path="/walletShow" element={<WalletShow />} />
          <Route path="/menuShow" element={<MenuShow />} />


      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
