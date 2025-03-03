import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";

const EmployShow = () => { 
          const [emp,setEmpData] = useState([])
 useEffect(() =>
{
          const fetchData = async () => {
                    const response = await axios.get("http://localhost:1118/showemploy");
                    setEmpData(response.data)
                };
                fetchData()
},[])


return(
          <div>
                    <Menu/>
<table border="3" align="center">
            <tr>
              <th>EmpNo</th>
              <th>Name</th>
              <th>Basic</th>
              
            </tr>
            {emp.map((item) => 
              <tr>
                <td>{item.empno}</td>
                <td>{item.name}</td>
                <td>{item.basic}</td>
              
              </tr>
            )}
          </table>
          </div>
          
        )

}
export default EmployShow;