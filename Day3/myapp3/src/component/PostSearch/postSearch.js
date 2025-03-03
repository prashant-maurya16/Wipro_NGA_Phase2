import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Menu/menu";
const PostSearch = () => {
  const [postResult, SetPostResult] = useState({});
  const [postId, SetPostId] = useState(0);

  const handleChange = (event) => {
    SetPostId(event.target.value);
    // alert(postid);
  };
  const show = () => {
    // alert(postId)
    let pid = parseInt(postId);
    axios.get("http://jsonplaceholder.typicode.com/posts/" + pid).then((response) => {
      SetPostResult(response.data);
    });
  };

  return (
    <div>
          <Menu/>
      <label>Post Id : </label>
      <input
        type="number"
        name="postId"
        value={postId}
        onChange={handleChange}
      />{" "}
      <br />
      <input type="button" value="Show" onClick={show} />
      <hr />
      Post Id : <b>{postResult.id}</b> <br />
      Title : <b>{postResult.title}</b> <br />
      Body : <b>{postResult.body}</b> <br />
    </div>
  );
};

export default PostSearch;
