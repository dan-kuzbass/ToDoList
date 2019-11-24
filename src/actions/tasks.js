import * as types from "../constants/actionTypes";

export const addTaskAction = data => {
  return async (dispatch) => {
    try {      
      return dispatch({
        type: types.ADD_TASK,
        data,
      });
    } catch (error) {
      throw (error);
    }
  };
};