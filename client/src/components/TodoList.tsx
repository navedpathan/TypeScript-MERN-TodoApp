import React from "react";

interface Todo {
  _id: string;
  text: string;
}

interface Props {
  todos: Todo[];
  startEditing: number | null;
  editedText: string;
  setStartEditing: React.Dispatch<React.SetStateAction<number | null>>;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  startEditing,
  editedText,
  setStartEditing,
  setEditedText,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div key={todo._id} className="todo-item">
          {startEditing !== index ? (
            <div>
              <p>{todo.text}</p>
              <div className="todo-item-buttons">
                <button
                  onClick={() => {
                    setStartEditing(index);
                    setEditedText(todo.text);
                  }}
                  className="todo-item-button edit"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(todo._id)} className="todo-item-button delete">Delete</button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <div className="todo-item-buttons">
                <button onClick={() => handleEdit(todo._id)} className="todo-item-button save">Save</button>
                <button onClick={() => setStartEditing(null)} className="todo-item-button cancel">Cancel</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;