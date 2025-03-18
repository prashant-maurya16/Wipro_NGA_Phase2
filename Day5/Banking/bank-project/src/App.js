
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import AccountSearch from './Components/AccountSearch/accountSearch';
import AccountShow from './Components/AccountShow/accountShow';
import CreateAccount from './Components/CreateAccount/createAccount';
import DepositAccount from './Components/DepositAccount/depositAccount';
import WithdrawAccount from './Components/WithdrawAccount/withdrawAccount';
import Menu from './Components/Menu/menu';
import Login from './Components/Login/login';

function App() {
  return (
    <div className="App">

      {/*
     <CreateAccount/>
     <br/>
     <AccountShow/>
     <br/>
     <DepositAccount/>
     <br/>
     <WithdrawAccount/>
     <br/>
     <AccountSearch/>
      */}

      <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/accountShow" element={<AccountShow />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/accountSearch" element={<AccountSearch />} />
      <Route path="/depositAccount" element={<DepositAccount />} />
      <Route path="/withdrawAccount" element={<WithdrawAccount />} />


      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
