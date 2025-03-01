import { Link } from "react-router-dom";
const Menu = () => {
    return(
        <div>
            Welcome to Menu Page <br/> 
            <br/> 
            <Link to="/first">First</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/second">Second</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/third">Third</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/calc">Calc</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/login">Login</Link>
            
        </div>
    )
}
export default Menu;

//in this file we link all components and then route it in app.js