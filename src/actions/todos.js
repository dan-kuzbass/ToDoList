import * as types from "../constants/actionTypes";
import axios from "axios";

export const addTodoAction = todo => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: types.ADD_TO_DO,
        todo,
      });
    } catch (error) {
      throw (error);
    }
  };
};

export const editTodoAction = todo => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: types.EDIT_TO_DO,
        todo
      });
    } catch (error) {
      throw (error);
    }
  };
};

export const deleteTodoAction = id => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: types.DELETE_TO_DO,
        id
      });
    } catch (error) {
      throw (error);
    }
  };
};