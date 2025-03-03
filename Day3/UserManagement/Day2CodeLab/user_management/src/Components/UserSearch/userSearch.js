import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";
const UserSearch = () => {
  const [userResult, SetUserResult] = useState({}); //{} return 0 or single value
  const [userId, SetUserId] = useState(0);
  const handleChange = (event) => {
    SetUserId(event.target.value);
  };
  const show = () => {
          // alert(userId)
          let uid = parseInt(userId);
          axios.get("http://localhost:1001/Searchuser/"+uid).then(
              (response) => {
                  SetUserResult(response.data)
              }  
            )
        
      }

  return (
    <div>
      <Menu/>

      <label>User Id : </label>
      <input
        type="number"
        name="userId"
        value={userId}
        onChange={handleChange}
      />{" "}
      <br />
      <input type="button" value="Show" onClick={show} />
      <hr/>
            User Id : <b>{userResult.id}</b> <br/>
            Name : <b>{userResult.name}</b> <br/>
            User Name : <b>{userResult.username}</b> <br/>
            Email : <b>{userResult.email}</b>

      <hr />
    </div>
  );
};

export default UserSearch;