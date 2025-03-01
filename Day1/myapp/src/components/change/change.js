import { useState } from "react";
import Menu from "../menu/menu";

function Change()
{

          const[name ,setName] = useState('parshu')
          return(


                    <div>
                              <Menu/>
                              <p>Name:{name}</p>
                              <button onClick={()=>setName("Prashant kuamr")}>Click for Change NAME</button>

                    </div>
          )
}
export default Change;