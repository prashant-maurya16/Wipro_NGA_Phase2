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
            <Link to="/four">Four</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/five">Five</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/counter">Counter</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/buttonEx">ButtonEx</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/change">Change</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    )
}
export default Menu;