import { Link } from "react-router-dom";

const Menu = () => {
    return(
        <div>
            Welcome to Menu Page <br/> 
            <Link to="/employShow">EmployShow</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/employSearch">EmploySearch</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/employInsert">EmployInsert</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
            
        </div>
    )
}

export default Menu;