import Menu from "../menu/menu";

const ButtonEx = () => {

          const Prashant = () => {
              alert("Hi I am prashant...");
          }
      
          const kumar = () => {
              alert("Hi I am kumar...");
          }
      
          const maurya = () => {
              alert("Hi I am maurya...")
          }
          return(
              <div>
                <Menu/>
                  <input type="button" value="Prashant" onClick={Prashant} /> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="button" value="kumar" onClick={kumar} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="button" value="maurya" onClick={maurya} />
              </div>
          )
      }
      
      export default ButtonEx;