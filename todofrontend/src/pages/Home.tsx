import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import TaskView from "../components/TaskView";
import TaskDetailed from "../components/TaskDetailed";
import { getToDos, addToDo, updateToDo, deleteToDo } from "../todoService";

interface ToDo {
  id?: number | undefined;
  title: string;
  description: string;
}

const emptyToDo: ToDo = {
  title: "",
  description: "",
};

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("tAll");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ToDo>(emptyToDo);

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getToDos();
      setTodos(fetchedTodos);
    }
    fetchTodos();
  }, []);

  const handleSave = async () => {
    const updatedTodo = await updateToDo(selectedTodo);
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    console.log("Save task", selectedTodo);
  };

  const handleDelete = async () => {
    const updatedTodos = await deleteToDo(selectedTodo);
    setTodos(updatedTodos);
  };

  const handleAddToDo = async () => {
    const newTodo = await addToDo(emptyToDo);
    setSelectedTodo(newTodo);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <Container>
      <Menu
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        addTask={handleAddToDo}
      />
      <TaskView
        todos={todos}
        selectedMenuItem={selectedMenuItem}
        setSelectedTodo={setSelectedTodo}
      />
      <TaskDetailed
        todo={selectedTodo}
        setTodo={setSelectedTodo}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Home;
