import React, { useContext } from "react";
import { TodoContext } from "../helpers/todoContext";
import { types } from "../helpers/types";
import "../styles/TodoItem.css";
import moment from "moment";
export const TodoItem = () => {
  const { todos, dispatch, inputTodo, setInputTodo } = useContext(TodoContext);

  const handleDelete = (id) => {
    dispatch({
      type: types.eliminarTodo,
      payload: id,
    });
    setInputTodo("");
  };

  const handleToogle = (id) => {
    dispatch({
      type: types.toogleTodo,
      payload: id,
    });
  };

  const handleEdit = (todo) => {
    if (inputTodo.length <= 1) {
      return;
    } else {
      dispatch({
        type: types.editarTodo,
        payload: { id: todo.id, todo: inputTodo },
      });
      setInputTodo("");
    }
  };

  const handleCurrentValue = (todo) => {
    setInputTodo(todo.todo);
  };

  return (
    <div className="list-container">
      {todos.map((todo, idx) => (
        <div
          onDoubleClick={() => handleCurrentValue(todo)}
          className={`todo-item  ${todo.hecho && "activo"}  `}
          key={todo.id}
        >
          <span>
            <b>
              {moment(todo.fecha).format("L") +
                " " +
                moment(todo.fecha).format("LT")}
            </b>
            <b>#{idx + 1}</b>
          </span>
          <p className={`${todo.hecho && "borrada"}`}>
            <b> Por hacer:</b> {todo.todo}
          </p>

          <b>
            Hecha:
            <input
              type="checkbox"
              onChange={() => handleToogle(todo.id)}
              checked={todo.hecho}
            />
          </b>
          <div className="buttons-container">
            <button className="btn editar" onClick={() => handleEdit(todo)}>
              Editar
            </button>

            <button
              className="btn eliminar"
              onClick={() => handleDelete(todo.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
