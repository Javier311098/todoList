import React, { useEffect, useReducer, useState } from "react";
import { TodoApp } from "./component/TodoApp";
import { TodoContext } from "./helpers/todoContext";
import { todoReducer } from "./helpers/todoReducer";

import "./styles/App.css";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [{}], init);
  const [inputTodo, setInputTodo] = useState("");

  useEffect(() => {
    if (!todos) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h1>Pendientes: {todos.filter((todo) => todo.hecho === false).length}</h1>
      <TodoContext.Provider
        value={{ todos, dispatch, inputTodo, setInputTodo }}
      >
        <TodoApp />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
