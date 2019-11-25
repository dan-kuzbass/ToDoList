import * as types from "../constants/actionTypes";

const initialState = {
  todos: []
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.GET_TODOS:
      return {
        ...state,
        todos: action.data
      };
    case types.ADD_TO_DO:
      return {
        ...state,
        todos: [...state.todos, action.data]
      };
    default:
      return state
  }
}