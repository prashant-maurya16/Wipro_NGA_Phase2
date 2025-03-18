import { useEffect, useState } from "react"
import axios from "axios";
import Menu from "../Menu/menu";

const AccountSearch = () => {

    const[accountResult, SetAccountResult] = useState({})
    const[accno,SetAccNo] = useState(0) 

    const handleChange = event => {
        SetAccNo(event.target.value)
        // alert(empno);
    }

    const show = () => {
        // alert(userId)
        let ano = parseInt(accno);
        axios.get("http://localhost:5106/api/Accounts/"+ano).then(
            (response) => {
                SetAccountResult(response.data)
            }  
          )
      
    }
    return(
        <div>
          <Menu/>
            <label>
                Account No : </label>
            <input type="number" name="accno" 
                value={accno} onChange={handleChange} /> <br/>
            <input type="button" value="Show" onClick={show} />
            <hr/>
            Account No : <b>{accountResult.accountNo}</b> <br/>
            First Name : <b>{accountResult.firstName}</b> <br/>
            Last Name : <b>{accountResult.lastName}</b> <br/> 
            City : <b>{accountResult.city}</b> <br/>
            State : <b>{accountResult.state}</b> <br/>
            Amount : <b>{accountResult.amount}</b> <br/> 
            AccountType : <b>{accountResult.accountType}</b> <br/> 
            CheqFacil : <b>{accountResult.cheqFacil}</b> <br/> <br/>

           
        </div>
    )

}

export default AccountSearch;