import { useState } from "react";
import axios from "axios";
import Menu from "../Menu/menu";
const UserInsert = () => {

          const [data, setData] = useState({
                    id : 0, 
                    name : '',
                    username : '',
                    email : '',
                })
                const handleChange = event => {
                    setData({
                        ...data,[event.target.name] : event.target.value  
                    })
                }

                const addUser = () => {
                    axios.post("http://localhost:1001/adduser",{
                      id : data.id,
                      name : data.name,
                      username : data.username,
                      email : data.email,
                    }).then(resp => {
                    //   alert(resp.data);
                      console.log(resp.data);
                    })
                  }

                return(
                    <div>
                              <Menu/>
                             
                        <label>Id: </label>
                        <input type="number" name="id" 
                            value={data.id} onChange={handleChange} /> <br/><br/>
                        <label> Name : </label>
                        <input type="text" name="name" 
                            value={data.name} onChange={handleChange} /> <br/><br/> 
                        <label>UserName </label>
                        <input type="text" name="username" 
                            value={data.username} onChange={handleChange} /> <br/><br/> 
                             <label>Email: </label>
                             <input type="text" name="email" 
                             
                            value={data.email} onChange={handleChange} /> <br/><br/> 
                        <input type="button" value="Add user" onClick={addUser} /> 
                     </div>
                )   


 }
 export default UserInsert