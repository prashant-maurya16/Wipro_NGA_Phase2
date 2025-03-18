import { useState } from "react";
import axios from "axios";
import Menu from "../Menu/menu";



const CustomerInsert = () => {
    const [data, setData] = useState({
        // empno : 0,
        custId: 0, 
        Name : '',
        userName : '',
        custPassword:'',
        city : '',
        state : '',
        email : '',
        mobileNo :''
        
    })

    const handleChange = event => {
        setData({
            ...data,[event.target.name] : event.target.value  
        })
    }

    const customerInsert = () => {
        axios.post("http://localhost:5108/api/Customers",{
          custId: data.custId,
          custName : data.custName,
          custUserName : data.custUserName,
          custPassword : data.custPassword,
          city : data.city, 
          state : data.state,
          email : data.email,
          mobileNo : data.mobileNo,
          
        }).then(resp => {
        //   alert(resp.data);
          console.log(resp.data);
        })
      }

      return(
        <div>
          <Menu/>
          <br/><hr/>
           
            <label>CustId</label>
            <input type="number" name="custId" 
                value={data.custId} onChange={handleChange} /> <br/><br/> 
            <label>Customer Name : </label>
            <input type="text" name="custName" 
                value={data.custName} onChange={handleChange} /> <br/><br/> 
            <label>User Name : </label>
            <input type="text" name="custUserName" 
                value={data.custUserName} onChange={handleChange} /> <br/><br/>  
                  <label>Cust Password : </label> 
                <input type="text" name="custPassword" 
                value={data.custPassword} onChange={handleChange} /> <br/><br/>  
            <label>City : </label>
            <input type="text" name="city" 
                value={data.city} onChange={handleChange} /> <br/><br/> 
            <label>State : </label>
            <input type="text" name="state" 
                value={data.state} onChange={handleChange} /> <br/><br/> 
                        <label>Email </label>
            <input type="text" name="email" 
                value={data.email} onChange={handleChange} /> <br/><br/> 
            <label>Mobile No </label>
            <input type="text" name="mobileNo" 
                value={data.mobileNo} onChange={handleChange} /> <br/><br/> 

<input type="button" value="Insert New Customer" onClick={customerInsert} />
                
            

        </div>

    )
}

export default CustomerInsert;