import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import "../styles/TodoApp.css";

export const TodoApp = () => {
  return (
    <div className="container-app">
      <TodoList />
      <TodoItem />
    </div>
  );
};
