
import { useState } from "react";
import Menu from "../menu/menu";
const Second = () => {
          const [message, setMessage] = useState('Welcome') 
          const handleChange = event => {
                    setMessage(event.target.value)
                }

          return(
                    <div>
                              <Menu/>
                    <label>
                Message is : </label>
                <input type="text" name="message" value={message}
                    onChange={handleChange}              /> 
            <br/>
            Message is : <b>{message}</b>

                    </div>
                  )


};

 export default Second;