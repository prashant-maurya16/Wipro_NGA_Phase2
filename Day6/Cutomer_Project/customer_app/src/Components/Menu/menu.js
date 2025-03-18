import {Link} from 'react-router-dom'


const Menu = () =>{

          return(
                    <div>
                             

                 <Link to="/customerInfo">CustomerInfo</Link>
                 &nbsp; &nbsp; &nbsp; &nbsp;
                 <Link to="/customerShow">CustomerShow</Link>
                 &nbsp; &nbsp; &nbsp; &nbsp;
                 <Link to="/customerInsert">CustomerInsert</Link>
                 &nbsp; &nbsp; &nbsp; &nbsp;
                 <Link to="/walletShow">WalletShow</Link>
                 &nbsp; &nbsp; &nbsp; &nbsp;
                 <Link to="/menuShow">MenuShow</Link>
                 &nbsp; &nbsp; &nbsp; &nbsp;

             
    
                    </div>




          )

          


}
export default Menu;