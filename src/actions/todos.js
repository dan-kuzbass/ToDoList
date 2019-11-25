import * as types from "../constants/actionTypes";
import axios from "axios";

export const getAllTodos = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/dan-kuzbass/ToDoList/todos');
      return dispatch({
        type: types.GET_TODOS,
        data: response.data,
      });
    } catch (error) {
      throw (error);
    }
  };
}

export const addTodoAction = data => {
  return async (dispatch) => {
    try {

      return dispatch({
        type: types.ADD_TO_DO,
        data,
      });
    } catch (error) {
      throw (error);
    }
  };
};