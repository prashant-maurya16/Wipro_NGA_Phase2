import { Link } from "react-router-dom";

const Menu = () => {
    return(
        <div>
            Welcome to My Banking Application.... <br/> <br/><br/><hr/>
            <Link to="/accountShow">AccountShow</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/createAccount">CreateAccount</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/accountSearch">AccountSearch</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/depositAccount">DepositAccount</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/withdrawAccount">WithdrawAccount</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            
        </div>
    )
}

export default Menu;