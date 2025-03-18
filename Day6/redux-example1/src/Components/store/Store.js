import { createStore } from "redux";
import CounterReducer from "../reducers/counterReducer";
const store=createStore(CounterReducer)
export default store;