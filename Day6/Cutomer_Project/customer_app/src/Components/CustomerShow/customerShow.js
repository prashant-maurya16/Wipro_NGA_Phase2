import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";


const CustomerShow = () => {

    const[show,setShow] = useState([]) 

  
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5108/api/Customers");
            setShow(response.data)
        };
        fetchData()
    },[])
    return(
        <div>
          <Menu/>
       <br/><hr/>
             <table border="3" align="center">
          <tr>
                    
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>User Name</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Mobile No</th>
            
          </tr>
          {show.map((item) => 
            <tr>
              <td>{item.custId}</td>
              <td>{item.custName}</td>
              <td>{item.custUserName}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.email}</td>
              <td>{item.mobileNo}</td>
              
            </tr>
          )}
        </table>
        </div>
    )
}

export default CustomerShow;