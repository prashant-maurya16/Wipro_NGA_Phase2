import { useDispatch, useSelector } from "react-redux";
import { prashant, sam, lakshya,sravani } from "../reducers/NameReducer";

const NameExample = () => {
          const sname = useSelector((state) => state.sname);
          const dispatch = useDispatch();

          return(
                    <div>
                        Student Name is : {sname} <hr/>
                        <button onClick={() => dispatch(prashant())}>
                            Prashant
                        </button> &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => dispatch(sam())}>
                            Sam
                        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => dispatch(lakshya())}>
                            Lakshya
                        </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => dispatch(sravani())}>
                            Sravani
                        </button>
                    </div>
                )

 }
 export default NameExample;