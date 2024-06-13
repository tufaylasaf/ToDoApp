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
  priority: string;
  dueDate?: string;
  completed: boolean;
}

const newToDo: ToDo = {
  title: "Edit Title",
  description: "Edit Description",
  completed: false,
  priority: "Low",
};

const emptyToDo: ToDo = {
  title: "",
  description: "",
  completed: false,
  priority: "Low",
};

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("tAll");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ToDo>(emptyToDo);

  const [openMenu, setopenMenu] = useState<boolean>(false);
  const [openTaskDetails, setopenTaskDetails] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getToDos();
      setTodos(fetchedTodos);
      setFilteredTodos(fetchedTodos);
    }
    fetchTodos();
  }, []);

  const handleSave = async () => {
    const updatedTodo = await updateToDo(selectedTodo);
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    setFilteredTodos(
      filteredTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
    console.log("Save task", selectedTodo);
    setopenTaskDetails(false);
  };

  const handleDelete = async () => {
    const updatedTodos = await deleteToDo(selectedTodo);
    setFilteredTodos(
      filteredTodos.filter((todo) => todo.id !== selectedTodo.id)
    );
    setSelectedTodo(emptyToDo);
    setTodos(updatedTodos);
    setopenTaskDetails(false);
  };

  const handleAddToDo = async () => {
    setopenMenu(false);
    const newTodo = await addToDo(newToDo);
    setSelectedTodo(newTodo);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setFilteredTodos((prevTodos) => [...prevTodos, newTodo]);
    setopenTaskDetails(true);
  };

  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name);

    let result = todos;

    if (name.startsWith("t")) {
      const filter = name.substring(1);
      if (filter === "All") result = todos;
      else {
        const completed = filter === "To Do";
        result = todos.filter((todo) => todo.completed !== completed);
      }
    } else if (name.startsWith("p")) {
      const priority = name.substring(1);
      result = todos.filter(
        (todo) => todo.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    setFilteredTodos(result);
    setopenMenu(false);
  };

  return (
    <Container>
      <Menu
        selectedMenuItem={selectedMenuItem}
        addTask={handleAddToDo}
        handleMenuItemClick={handleMenuItemClick}
        openMenu={openMenu}
      />
      <TaskView
        todos={filteredTodos}
        selectedMenuItem={selectedMenuItem}
        setSelectedTodo={setSelectedTodo}
        setOpenTaskView={setopenTaskDetails}
        setOpenMenu={setopenMenu}
      />
      <TaskDetailed
        todo={selectedTodo}
        setTodo={setSelectedTodo}
        onDelete={handleDelete}
        onSave={handleSave}
        openView={openTaskDetails}
        setOpenView={setopenTaskDetails}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Home;
