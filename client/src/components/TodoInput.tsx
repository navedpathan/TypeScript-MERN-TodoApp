import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";

interface Todo {
  _id: string;
  text: string;
}

const TodoInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [addTodo, setAddTodo] = useState<Todo[]>([]);
  const [startEditing, setStartEditing] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>(`${process.env.REACT_APP_API_KEY}/api/todos`);
    setAddTodo(res.data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input !== "") {
      await axios.post(`${process.env.REACT_APP_API_KEY}/api/todos`, {
        text: input,
      });
      setInput("");
      fetchTodos();
    }
  };

  const handleEdit = async (id: string) => {
    if (editedText !== "") {
      await axios.put(`${process.env.REACT_APP_API_KEY}/api/todos/${id}`, {
        text: editedText,
      });
      setStartEditing(null);
      setEditedText("");
      fetchTodos();
    }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${process.env.REACT_APP_API_KEY}/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="todo-input-container">
      <form onSubmit={handleAdd} className="todo-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-input-button">Add</button>
      </form>
      <TodoList
        todos={addTodo}
        startEditing={startEditing}
        editedText={editedText}
        setStartEditing={setStartEditing}
        setEditedText={setEditedText}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default TodoInput;