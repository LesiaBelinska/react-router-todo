const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = { ...req.body, id: todos.length + 1 };

  todos.push(newTodo);
  res.status(200).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text, status } = req.body;

  const todo = todos.find((todo) => todo.id === +id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found!" });
  }

  if (text !== undefined) todo.text = text;
  if (status !== undefined) todo.status = status;

  res.status(200).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === +id);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found!" });
  }

  const deletedTodo = todos.splice(todoIndex, 1);
  res
    .status(200)
    .json({ message: `Todo with ID ${id} deleted!`, todo: deletedTodo });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
