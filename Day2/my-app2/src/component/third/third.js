import { useState } from "react";
import Menu from "../menu/menu";

const Third = () => {

          const [data, setData] = useState({
              firstName : '',
              lastName : '',
              fullName : ''
          });

          const show = () => {
                    let res = data.firstName + " " +data.lastName;
                     setData({
                         fullName : res 
                     });
                 }

          const handleChange = event => {
                    setData({
                        ...data,[event.target.name] : event.target.value  
                        /*working of this 

                        ...data,[event.target.name] : event.target.value 

then if you given onChange n firstName field, it works as

data.firstName : firstNametextBoxValue

if you given onChange in lastName field 

data.lastName : lastNameTextBoxValue*/




                    })
                }      

          

          return(

                    <div>
                              <Menu/>
                              <form>
                <label>First Name :</label>
                <input type="text" name="firstName" 
                    value={data.firstName} onChange={handleChange} /> <br/> 
                <label>Last Name : </label>
                <input type="text" name="lastName"
                    value={data.lastName} onChange={handleChange}/> <br/> 
                <label>Full Name </label>
                    <input type="text" name="fullName" 
                        value={data.fullName} />  <br/>
                <input type="button" value="Show" onClick={show}/>
            </form>

                    </div>
          );
      
      };
      
      export default Third;