import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
          <h4><b>Welcome To Menu Page..</b></h4>
      <Link to="/userShow">UserShow</Link> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 
      <Link to="/userSearch">UserSearch</Link> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 
      <Link to="/userInsert">UserInsert</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
  );
};

export default Menu;
