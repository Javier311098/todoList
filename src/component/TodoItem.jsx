import "../styles/TodoItem.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  startDeletingTodo,
  startUpdatingTodo,
  todoSeleccionado,
  toggleHecha,
} from "../redux/actions/todo";

export const TodoItem = () => {
  const { todos, inputTodo } = useSelector((state) => state.listTodos);
  const dispatch = useDispatch();
  const handleDelete = (todo) => {
    dispatch(startDeletingTodo(todo));
  };

  const handleCheck = (todo) => {
    dispatch(toggleHecha(todo.id));
  };

  const handleEdit = (todo) => {
    if (inputTodo.length <= 1) {
      return;
    } else {
      const todoActualizado = { ...todo, nombre: inputTodo, hecha: todo.hecha };
      dispatch(startUpdatingTodo(todoActualizado));
    }
  };

  const handleSelectTodo = (todo) => {
    dispatch(todoSeleccionado(todo));
  };

  return (
    <div className="list-container">
      {todos.map((todo, idx) => (
        <div
          onDoubleClick={() => handleSelectTodo(todo)}
          className={`todo-item  ${todo.hecha && "activo"}  `}
          key={todo.id}
        >
          <span>
            <b>
              {moment(todo.fecha).format("DDD/MM/YY") +
                " " +
                moment(todo.fecha).format("LT")}
            </b>
            <b>#{idx + 1}</b>
          </span>
          <p className={`${todo.hecha && "borrada"}`}>
            <b> Por hacer:</b> {todo.nombre}
          </p>

          <b>
            Hecha:
            <input
              type="checkbox"
              onChange={() => handleCheck(todo)}
              checked={todo.hecha}
            />
          </b>
          <div className="buttons-container">
            <button className="btn editar" onClick={() => handleEdit(todo)}>
              Editar
            </button>

            <button className="btn eliminar" onClick={() => handleDelete(todo)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
