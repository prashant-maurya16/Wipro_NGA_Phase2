import { useState } from "react";
import Menu from "../menu/menu";

const First = () => {
    const [name,setName] = useState('')

    const prashant = () => {
        setName("Hi I am Prashant...")
    }

    const kumar = () => {
        setName("Hi I am kumar...")
    }

    const maurya = () => {
        setName("Hi I am maurya...")
    }

    return(
        <div>
          <Menu/>
            <p>Student Name is : {name}</p> 
            <br/>
            <input type="button" value="Prashant" onClick={prashant} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" value="kumar" onClick={kumar} /> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" value="maurya" onClick={maurya} />
        </div>
    )
}

export default First;