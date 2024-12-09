import { useState, useEffect } from "react";

import TodoForm from "../../components/TodoForm/TodoForm.jsx";
import TodoList from "../../components/TodoList/TodoList.jsx";
import s from "./HomePage.module.css";
import * as api from "../../services/todos-api.js";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api
      .getTodos()
      .then((response) => setTodos(response))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addNewTodo = (taskText) => {
    const newTodo = { text: taskText, status: false };
    api
      .createTodo(newTodo)
      .then((createdTodo) => {
        setTodos((prevTodos) => [...prevTodos, createdTodo]);
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  const toggleTodoStatus = (id, currentStatus) => {
    const updatedStatus = !currentStatus; 
    api
      .updateTodo(id, { status: updatedStatus })
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, status: updatedTodo.status } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  return (
    <>
      <div className={s.container}>
        <TodoForm onSubmit={addNewTodo} />
        <TodoList todos={todos} onToggleStatus={toggleTodoStatus} />
      </div>
    </>
  );
};

export default HomePage;
