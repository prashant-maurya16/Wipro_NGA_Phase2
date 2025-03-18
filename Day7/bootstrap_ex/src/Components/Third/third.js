import react from "react"; 
import Badge from "react-bootstrap/Badge"; 
import Button from "react-bootstrap/Button"; 
import Alert from "react-bootstrap/Alert"
import 'bootstrap/dist/css/bootstrap.css';
export default function Third() { 
    return ( 
   
        <div> 

<Button variant="secondary"> 
            Primary variant  
            <Badge variant="primary"> 
              10 
            </Badge> 
          </Button>{" "} 
          <Button variant="secondary"> 
            Secondary variant  
            <Badge variant="secondary"> 
              10 
            </Badge> 
          </Button>{" "}
          <Button variant="secondary"> 
            Success variant  
            <Badge variant="success"> 
              10 
            </Badge> 
          </Button>{" "} 
          <Button variant="secondary"> 
            Danger variant  
            <Badge variant="danger"> 
              10 
            </Badge> 
          </Button>{" "} 
          <Button variant="secondary"> 
            Warning variant  
            <Badge variant="warning"> 
              10 
            </Badge> 
          </Button>{" "}

</div> )}