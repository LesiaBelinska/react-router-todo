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
    }

  return (
    <>
      <TodoForm onSubmit={addNewTodo}/>
      <TodoList todos={todos}/>
    </>
  );
};

export default HomePage;
