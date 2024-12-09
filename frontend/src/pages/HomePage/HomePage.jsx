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

  const deleteTodo = (id) => {
    api
      .deleteTodo(id)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>To-Do List</h1>
        <TodoForm onSubmit={addNewTodo} />
        <TodoList todos={todos} onToggleStatus={toggleTodoStatus} onDeleteTodo={deleteTodo} />
      </div>
    </>
  );
};

export default HomePage;
