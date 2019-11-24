import * as types from "../constants/actionTypes";

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