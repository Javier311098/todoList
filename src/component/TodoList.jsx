import React, { useContext, useState } from "react";
import { TodoContext } from "../helpers/todoContext";

import { types } from "../helpers/types";
import "../styles/TodoList.css";

export const TodoList = () => {
  const { dispatch, inputTodo, setInputTodo } = useContext(TodoContext);

  const agregarTodo = (e) => {
    e.preventDefault();

    if (inputTodo.length <= 1) {
      return;
    } else {
      const newTodo = {
        id: new Date(),
        todo: inputTodo,
        hecho: false,
      };
      dispatch({
        type: types.agregarTodo,
        payload: newTodo,
      });
      setInputTodo("");
    }
  };

  const handleInputChange = ({ target }) => {
    setInputTodo(target.value);
  };

  return (
    <>
      <form className="form-todo" onSubmit={agregarTodo}>
        <input
          value={inputTodo}
          className="todo-input"
          onChange={handleInputChange}
          type="text"
          placeholder="Agregar pendiente..."
        />
        <button className="btn agregar" type="submit">
          Agregar
        </button>
      </form>
    </>
  );
};
