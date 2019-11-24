import * as types from "../constants/actionTypes";

const initialState = {
  todos: [
    { id: "1", name: "Отпуск", done: false },
    { id: "2", name: "Работа", done: true },
    { id: "3", name: "Казино", done: true },
  ]
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_DO:
      return {
        ...state,
        todos: [...state.todos, action.data]
      };
    default:
      return state
  }
}