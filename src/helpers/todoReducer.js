import { types } from "./types";

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case types.agregarTodo:
      return [...state, action.payload];
    case types.eliminarTodo:
      return state.filter((todo) => todo.id !== action.payload);
    case types.toogleTodo:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, hecho: !todo.hecho } : todo
      );
    case types.editarTodo:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
    default:
      return state;
  }
};
