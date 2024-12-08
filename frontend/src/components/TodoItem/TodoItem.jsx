import s from "./TodoItem.module.css";

const TodoItem = ({ id, taskText, taskStatus, onDeleteTodo }) => {
  const getTaskStatus = () => (taskStatus ? "done" : "");

  return (
    <li className={`${s.taskItem} ${getTaskStatus()}`}>
      <label>
        <input
          className={`${s.taskInput} ${getTaskStatus()}`}
          type="checkbox"
        />
        {taskText}
      </label>
      <button className={s.button} type="button" onClick={() => onDeleteTodo(id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
