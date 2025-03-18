import { createStore } from "redux";
import NameReducer from "../reducers/NameReducer";

const store=createStore(NameReducer)
export default store;