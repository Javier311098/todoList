import { types } from "../types/types";

const initState = {
  todos: [],
  todoSelected: null,
  isLoading: true,
  inputTodo: "",
};

export const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case types.obtenerTodos:
      return { ...state, todos: [...action.payload] };
    case types.agregarTodo:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        todoSelected: initState.todoSelected,
      };
    case types.eliminarTodo:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        todoSelected: initState.todoSelected,
        inputTodo: initState.inputTodo,
      };
    case types.toogleTodo:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, hecha: !todo.hecha } : todo
        ),
      };

    case types.editarTodo:
      return {
        ...state,
        todoSelected: initState.todoSelected,
        inputTodo: initState.inputTodo,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case types.todoIsLoading:
      return { ...state, isLoading: false };

    case types.todoSeleccionado:
      return {
        ...state,
        todoSelected: action.payload,
      };

    case types.inputTodo:
      return { ...state, inputTodo: action.payload };

    default:
      return state;
  }
};
