import * as types from "../constants/actionTypes";

const initialState = {
  tasks: [
    {
      id: "f5d47a11",
      name: "Хлеб",
      listID: "f5d47a01",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a12",
      name: "Молоко",
      listID: "f5d47a01",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a13",
      name: "Чай",
      listID: "f5d47a01",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a14",
      name: "Выучить react-native",
      listID: "f5d47a02",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a15",
      name: "Получить диплом",
      listID: "f5d47a02",
      done: false,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a16",
      name: "Съездить в Казахстан",
      listID: "f5d47a02",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a17",
      name: "Что то",
      listID: "f5d47a03",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a18",
      name: "Что то",
      listID: "f5d47a03",
      done: true,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a19",
      name: "Что то",
      listID: "f5d47a03",
      done: false,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a20",
      name: "Что то",
      listID: "f5d47a04",
      done: false,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a21",
      name: "Что то",
      listID: "f5d47a04",
      done: true,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a22",
      name: "Что то",
      listID: "f5d47a04",
      done: false,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a23",
      name: "Что то",
      listID: "f5d47a05",
      done: true,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a24",
      name: "Что то",
      listID: "f5d47a05",
      done: true,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a25",
      name: "Что то",
      listID: "f5d47a05",
      done: true,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a26",
      name: "Что то",
      listID: "f5d47a06",
      done: true,
      immediate: false,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a27",
      name: "Что то",
      listID: "f5d47a06",
      done: true,
      immediate: true,
      created_time: "01.01.2019 13:55"
    },
    {
      id: "f5d47a28",
      name: "Что то",
      listID: "f5d47a06",
      done: true,
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