import * as types from "../constants/actionTypes";

export const addTaskAction = task => {
  return async (dispatch) => {
    try {      
      return dispatch({
        type: types.ADD_TASK,
        task,
      });
    } catch (error) {
      throw (error);
    }
  };
};

export const editTaskAction = task => {
  return async (dispatch) => {
    try {      
      return dispatch({
        type: types.EDIT_TASK,
        task
      });
    } catch (error) {
      throw (error);
    }
  };
};

export const deleteTaskAction = id => {
  return async (dispatch) => {
    try {      
      return dispatch({
        type: types.DELETE_TASK,
        id
      });
    } catch (error) {
      throw (error);
    }
  };
};