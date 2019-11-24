import { combineReducers } from "redux"
import todos from "./todos";
import tasks from "./tasks";

export default combineReducers({
  todos,
  tasks
})