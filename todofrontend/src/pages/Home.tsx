import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import TaskView from "../components/TaskView";
import TaskDetailed from "../components/TaskDetailed";
import {
  getToDos,
  addToDo,
  updateToDo,
  deleteToDo,
  getUser,
} from "../todoService";
import { ToDo } from "../models/ToDo";
import { User } from "../models/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const newToDo: ToDo = {
  title: "Edit Title",
  description: "Edit Description",
  completed: false,
  priority: "Low",
  userName: "",
};

const emptyToDo: ToDo = {
  title: "",
  description: "",
  completed: false,
  priority: "Low",
  userName: "",
};

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("tAll");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<ToDo>(emptyToDo);

  const [openMenu, setopenMenu] = useState<boolean>(false);
  const [openTaskDetails, setopenTaskDetails] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>();

  const navigate = useNavigate();

  const handleSave = async () => {
    const updatedTodo = await updateToDo(selectedTodo);
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    setFilteredTodos(
      filteredTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
    console.log("Save task", selectedTodo);
    toast.success("Changes Saved!");
    setopenTaskDetails(false);
  };

  const handleDelete = async () => {
    const updatedTodos = await deleteToDo(selectedTodo);
    setFilteredTodos(
      filteredTodos.filter((todo) => todo.id !== selectedTodo.id)
    );
    setSelectedTodo(emptyToDo);
    setTodos(updatedTodos);
    toast.success("Task Deleted!");
    setopenTaskDetails(false);
  };

  const handleAddToDo = async () => {
    setopenMenu(false);
    newToDo.userName = loggedInUser?.userName;
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

  useEffect(() => {
    async function fetchTodos(userName: string | undefined) {
      const fetchedTodos = await getToDos(userName);
      setTodos(fetchedTodos);
      setFilteredTodos(fetchedTodos);
    }

    async function validateUser(token: string) {
      const user = await getUser(token);
      setLoggedInUser(user);
      newToDo.userName = user?.userName;
      emptyToDo.userName = user?.userName;
    }

    const token = localStorage.getItem("authToken");
    if (token != null) {
      setIsAuthenticated(true);
      validateUser(token);
      fetchTodos(token);
    } else {
      toast.error("You need to Sign In!");
      navigate("/");
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

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
