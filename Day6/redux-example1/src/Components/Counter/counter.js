import {useDispatch,useSelector} from "react-redux";
import { increment,decrement,power } from "../reducers/counterReducer";
const Counter = () => { 
          const count = useSelector((state) => state.count);
          const dispatch = useDispatch()

          return(
                    <div>
                        Count is : <b> {count}</b> <hr/>
                        <button onClick={() => dispatch(increment())}>
                            Increment 
                        </button> 
                        <button onClick={() => dispatch(decrement())}>
                            Decrement 
                        </button>
                        <button onClick={() => dispatch(power())}>
                            Power
                        </button>
                    </div>
                )

}
export default Counter;