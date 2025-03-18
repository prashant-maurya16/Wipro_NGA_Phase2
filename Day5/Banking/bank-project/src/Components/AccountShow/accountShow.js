import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";

const AccountShow = () => {

    const[account,setAccount] = useState([]) 

  
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5106/api/Accounts");
            setAccount(response.data)
        };
        fetchData()
    },[])
    return(
        <div>
          <Menu/>
             <table border="3" align="center">
          <tr>
            <th>AccountNo</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>City</th>
            <th>State</th>
            <th>Amount</th>
            <th>AccountType</th>
            <th>CheqFacil</th>
          </tr>
          {account.map((item) => 
            <tr>
              <td>{item.accountNo}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.amount}</td>
              <td>{item.accountType}</td>
              <td>{item.cheqFacil}</td>
            </tr>
          )}
        </table>
        </div>
    )
}

export default AccountShow;