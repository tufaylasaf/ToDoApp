// src/App.tsx

import React, { useEffect, useState } from "react";
import { getToDos, addToDo, updateToDo, deleteToDo } from "./todoService";

interface ToDo {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newToDo, setNewToDo] = useState<ToDo>({
    id: 0,
    title: "",
    description: "",
  });

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getToDos();
      setTodos(fetchedTodos);
    }
    fetchTodos();
  }, []);

  const handleAddToDo = async () => {
    const updatedTodos = await addToDo(newToDo);
    setTodos(updatedTodos);
  };

  const handleUpdateToDo = async (todo: ToDo) => {
    const updatedTodo = await updateToDo(todo);
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  const handleDeleteToDo = async (id: number) => {
    const updatedTodos = await deleteToDo(id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <input
        type="text"
        placeholder="Title"
        value={newToDo.title}
        onChange={(e) => setNewToDo({ ...newToDo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newToDo.description}
        onChange={(e) =>
          setNewToDo({ ...newToDo, description: e.target.value })
        }
      />
      <button onClick={handleAddToDo}>Add ToDo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <span>{todo.description}</span>
            <button
              onClick={() =>
                handleUpdateToDo({ ...todo, title: todo.title + " Updated" })
              }
            >
              Update
            </button>
            <button onClick={() => handleDeleteToDo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
