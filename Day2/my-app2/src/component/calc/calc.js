import { useState } from "react";
import Menu from "../menu/menu";
const Calc = () => {

          const [data, setData] = useState({
              firstNo : 0, 
              secondNo : 0,
              result : 0
          })
          const handleChange = event => {
                    setData({
                        ...data,[event.target.name] : event.target.value  
                    })
                }  ;

                const sum = () => {
                    let res = parseInt(data.firstNo) + parseInt(data.secondNo);
                    setData({
                              ...data, result : res, 
                    });        
                } 
                const sub = () => {
                    let res = parseInt(data.firstNo) - parseInt(data.secondNo);
                    setData({
                              ...data,result : res ,
                    });        
                }    
                const mul = () => {
                    let res = parseInt(data.firstNo) * parseInt(data.secondNo);
                    setData({
                              ...data, result : res ,
                    });        
                }  


                return(
                    <div>
                              <Menu/>
                        <label>First Number : </label>
                        <input type="number" name="firstNo" 
                            value={data.firstNo} onChange={handleChange} /> <br/><br/>
                        <label>Second Number : </label>
                        <input type="number" name="secondNo" 
                            value={data.secondNo} onChange={handleChange} /> <br/><br/> 
                        <label>Result </label>
                        <input type="number" name="result" 
                            value={data.result} /> <br/><br/> 
                        <input type="button" value="Sum" onClick={sum} /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="Sub" onClick={sub} /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="button" value="Mult" onClick={mul}   />
                    </div>
                );

      };
      export default Calc;
