import * as types from "../constants/actionTypes";

const initialState = {
  tasks: [
    {
      id: "f5d47a11",
      name: "Выучить react native",
      listID: "f5d47a02",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a12",
      name: "Сходить погулять",
      listID: "f5d47a03",
      done: true,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a13",
      name: "Сделать курсач",
      listID: "f5d47a01",
      done: false,
      immediate: true,
      created_time: "01.01.2019 13:55"
    }
  ]
}

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };
    case types.EDIT_TASK:
      let tasks = state.tasks.filter(task => task.id !== action.task.id);
      return {
        ...state,
        tasks: [ ...tasks, action.task ]
      };
    case types.DELETE_TASK:
      let tasksWithoutRemoved = state.tasks.filter(task => task.id !== action.id);
      return {
        ...state,
        tasks: tasksWithoutRemoved
      };
    default:
      return state
  }
}