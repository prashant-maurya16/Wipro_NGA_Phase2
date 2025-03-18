import { useState } from "react";
import axios from "axios";
import Menu from "../Menu/menu";

const WithdrawAccount = () => {
     const [data, setData] = useState({
            accountNo : 0, 
            withdrawAmount : 0
        })
    const [result,setResult]=useState('')
    const handleChange = event => {
          setData({
              ...data,[event.target.name] : event.target.value  
          })
      }

      const withdrawAmount = () => {
          axios.post("http://localhost:5106/withdraw/" +data.accountNo +"/" +data.withdrawAmount).then(resp => {
          //   alert(resp.data);
          setResult(resp.data);
            console.log(resp.data);
          })
        }

      return(
          <div>
                    <Menu/>
              <p>{result}</p>
              <label>Account Number : </label>
              <input type="number" name="accountNo" 
                  value={data.accountNo} onChange={handleChange} /> <br/><br/> 
              <label>Withdraw Amount : </label>
              <input type="number" name="withdrawAmount" 
                  value={data.withdrawAmount} onChange={handleChange} /> <br/><br/>     
            
  
              <input type="button" value="Withdraw Amount" onClick={withdrawAmount} /> 
           </div>
      )

}
export default WithdrawAccount;