import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";

const PostShow = () => { 
          const [posts,setPostData] = useState([])
 useEffect(() =>
{
          const fetchData = async () => {
                    const response = await axios.get("http://jsonplaceholder.typicode.com/posts");
                    setPostData(response.data)
                };
                fetchData()
},[])


return(
          <div>
                    <Menu/>
                    <table border="3" align="center">
            <tr>
              <th>USERID</th>
              <th>ID</th>
              <th>TITLE</th>
              <th>BODy</th>
            </tr>
            {posts.map((item) => 
              <tr>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            )}
          </table>
          </div>
        )

}
export default PostShow;