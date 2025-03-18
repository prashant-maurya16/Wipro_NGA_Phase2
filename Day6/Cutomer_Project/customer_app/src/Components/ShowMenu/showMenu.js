import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";


const MenuShow = () => {

    const[menu,setMenu] = useState([]) 

  
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5108/api/Menus");
            setMenu(response.data)
        };
        fetchData()
    },[])
    return(
        <div>
          <Menu/>
       <br/><hr/>
             <table border="3" align="center">
          <tr>
                    
            <th>Menu Id</th>
            <th>Item Name</th>
            <th>Item Type</th>
            <th>Price</th>
            <th>Description</th>
            <th>Rating</th>
           
            
          </tr>
          {menu.map((item) => 
            <tr>
              <td>{item.menuId}</td>
              <td>{item.itemName}</td>
              <td>{item.itemType}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.rating}</td>
             
              
            </tr>
          )}
        </table>
        </div>
    )
}

export default MenuShow;