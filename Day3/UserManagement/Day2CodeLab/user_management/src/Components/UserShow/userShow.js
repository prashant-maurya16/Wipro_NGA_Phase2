import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";

const UserShow = () => { 
          const [users,setUserData] = useState([])
 useEffect(() =>
{
          const fetchData = async () => {
                    const response = await axios.get("http://localhost:1001/showuser");
                    setUserData(response.data)
                };
                fetchData()
},[])

return(
          <div>
            <Menu/>
         
            <table border="3" align="center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
            </tr>
            {users.map((item) => 
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
              </tr>
            )}
          </table>
          </div>
        )

}
export default UserShow;