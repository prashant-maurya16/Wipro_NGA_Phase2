import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
          return(
              <div>
                  Welcome to Menu Page <br/> 
                  <br/> 
                  <Link to="/userShow">UserShow</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/employShow">EmployShow</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/postShow">PostShow</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/userSearch">UserSearch</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/emplSearch">EmploySearch</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/postSearch">PostSearch</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/employInsert">EmployInsert</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/userInsert">UserInsert</Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
                  
              </div>
          )
      }
      export default Menu;
