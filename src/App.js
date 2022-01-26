import { TodoApp } from "./component/TodoApp";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./styles/App.css";
import "./styles/Responsivo.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </div>
  );
}

export default App;
