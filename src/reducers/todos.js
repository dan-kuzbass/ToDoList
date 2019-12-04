import * as types from "../constants/actionTypes";

const initialState = {
  todos: [
    {
      id: "f5d47a01",
      name: "Сходить в магазин",
      tasks: 0
    },
    {
      id: "f5d47a02",
      name: "Планы на 2020",
      tasks: 0
    },
    {
      id: "f5d47a03",
      name: "Отпуск",
      tasks: 1
    },
    {
      id: "f5d47a04",
      name: "Планы на март",
      tasks: 1
    },
    {
      id: "f5d47a05",
      name: "Планы на апрель",
      tasks: 2
    },
    {
      id: "f5d47a06",
      name: "Учёба",
      tasks: 2
    }
  ]
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_DO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case types.EDIT_TO_DO:
      let todos = state.todos.filter(todo => todo.id !== action.todo.id);
      return {
        ...state,
        todos: [...todos, action.todo]
      };
    case types.DELETE_TO_DO:
      let todosWithoutRemoved = state.todos.filter(todo => todo.id !== action.id);
      return {
        ...state,
        todos: todosWithoutRemoved
      };
    default:
      return state
  }
}