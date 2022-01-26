import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingTodos } from "../redux/actions/todo";
import "../styles/TodoApp.css";

export const TodoApp = () => {
  const dispatch = useDispatch();
  dispatch(startLoadingTodos());
  const { isLoading } = useSelector((state) => state.listTodos);
  return (
    <>
      {isLoading ? (
        <h2>LOADING...</h2>
      ) : (
        <>
          <TodoList />
          <div className="container-app">
            <TodoItem />
          </div>
        </>
      )}
    </>
  );
};
