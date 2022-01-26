import Swal from "sweetalert2";
import { fetchTodo } from "../../helpers/fetch";
import { types } from "../types/types";

export const startLoadingTodos = () => {
  return async (dispatch, getState) => {
    const { isLoading } = getState().listTodos;
    if (isLoading) {
      const resp = await fetchTodo("/");
      const body = await resp.json();
      const { todos } = body;
      dispatch(getTodos(todos));
      dispatch(loadingTodos());
    }
  };
};

const getTodos = (todos) => ({
  type: types.obtenerTodos,
  payload: todos,
});

export const starAddnewTodo = (todo) => {
  return async (dispatch) => {
    try {
      const resp = await fetchTodo("/add", todo, "POST");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire("Creado", "Se logro agregar correctamente", "success");
        dispatch(addTodo(body.todoGuardado));
      } else {
        Swal.fire("Error", "No se pudo crear un nuevo todo", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addTodo = (todo) => ({
  type: types.agregarTodo,
  payload: todo,
});

export const startDeletingTodo = (todo) => {
  return async (dispatch) => {
    try {
      const resp = await fetchTodo(`/delete/${todo.id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(borrarTodo(todo));
        Swal.fire("Borrado", "Se logro eliminar correctamente", "success");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const borrarTodo = (todo) => ({
  type: types.eliminarTodo,
  payload: todo,
});

export const todoSeleccionado = (todo) => ({
  type: types.todoSeleccionado,
  payload: todo,
});

export const startUpdatingTodo = (todo) => {
  return async (dispatch) => {
    try {
      const resp = await fetchTodo(`/update/${todo.id}`, todo, "PUT");
      const body = await resp.json();

      if (body.ok) {
        Swal.fire("Editado", "Se logro editar correctamente", "success");
        dispatch(editarTodo(todo));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const editarTodo = (todo) => ({
  type: types.editarTodo,
  payload: todo,
});

const loadingTodos = () => ({
  type: types.todoIsLoading,
});

export const changeNameInput = (nombre) => ({
  type: types.inputTodo,
  payload: nombre,
});

export const toggleHecha = (id) => ({
  type: types.toogleTodo,
  payload: id,
});
