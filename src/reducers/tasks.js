import * as types from "../constants/actionTypes";

const initialState = {
  tasks: [
    {
      id: "1",
      name: "Сделать курсач",
      listID: "1",
      done: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "2",
      name: "Сходить погулять",
      listID: "2",
      done: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "3",
      name: "Выучить react native",
      listID: "3",
      done: false,
      created_time: "01.01.2019 13:55"
    }
  ]
}

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.data]
      };
    default:
      return state
  }
}