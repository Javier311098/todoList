import React, { useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { changeNameInput, starAddnewTodo } from "../redux/actions/todo";

import "../styles/TodoList.css";

export const TodoList = () => {
  const dispatch = useDispatch();
  const { inputTodo, todos, todoSelected } = useSelector(
    (state) => state.listTodos
  );
  const handleInputChange = ({ target }) => {
    dispatch(changeNameInput(target.value));
  };
  useEffect(() => {
    if (todoSelected) {
      dispatch(changeNameInput(todoSelected.nombre));
    } else {
      dispatch(changeNameInput(""));
    }
  }, [dispatch, todoSelected]);
  const agregarTodo = (e) => {
    e.preventDefault();

    if (inputTodo.length <= 1) {
      return;
    } else {
      const newTodo = {
        nombre: inputTodo,
        fecha: moment().toDate(),
        hecha: false,
      };
      dispatch(starAddnewTodo(newTodo));
      dispatch(changeNameInput(""));
    }
  };

  return (
    <>
      <form className="form-todo" onSubmit={agregarTodo}>
        <h1>
          Pendientes: {todos.filter((todo) => todo.hecha === false).length}
        </h1>
        <input
          value={inputTodo}
          className="todo-input"
          onChange={handleInputChange}
          type="text"
          placeholder="Agregar pendiente..."
        />
        {!inputTodo && (
          <span className="error-input">
            *se require al menos dos caracteres
          </span>
        )}
        <button className="btn agregar" type="submit">
          Agregar
        </button>
      </form>
    </>
  );
};
