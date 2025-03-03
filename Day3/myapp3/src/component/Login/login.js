import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        userName : '',
        passCode : ''
    })

    // const history = useHistory();

    const handleChange = event => {
        setData({
            ...data,[event.target.name] : event.target.value  
        })
    }

    const handleSubmit = () => {

        let user = data.userName;
        let pwd = data.passCode;
        // alert(user + " " + pwd)
        axios.get("http://localhost:2222/validate/"+user +"/"+pwd).then(
            (response) => {
                // alert(response.data);
                if (response.data == "1") {
                    // alert("Correct")
                    navigate("/menu")
                } else {
                    alert("Invalid Credentials...");
                }
            }  
          )
        // alert(data.userName);
        // alert(data.passCode);
        // if (data.userName=="Wipro" && data.passCode == "Wipro") {
        //     // alert("Correct");
        //   navigate("/menu")
        // } else {
        //     alert("Invalid Credentials...");
        // }
    }

    return(
        <div>
            <form>
                <label>
                    User Name : </label>
                    <input type="text" name="userName" onChange={handleChange}
                        value={data.userName} /> <br/><br/>
                <label>Password</label> 
                    <input type="password" name="passCode" onChange={handleChange}
                        value={data.passCode} /> <br/><br/>
                <input type="button" value="Login" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Login;