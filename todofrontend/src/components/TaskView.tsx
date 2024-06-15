import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { FaBars } from "react-icons/fa";
import { ToDo } from "../models/ToDo";

interface TaskViewProps {
  todos: ToDo[];
  selectedMenuItem: string;
  setSelectedTodo: React.Dispatch<React.SetStateAction<ToDo>>;
  setOpenTaskView: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskView: React.FC<TaskViewProps> = ({
  todos,
  selectedMenuItem,
  setSelectedTodo,
  setOpenTaskView,
  setOpenMenu,
}) => {
  const heading: string = selectedMenuItem.slice(1);

  return (
    <Container>
      <Heading>
        <h1>{heading}</h1>
        <Counter>{todos.length}</Counter>
        <BurgerIcon onClick={() => setOpenMenu(true)} />
      </Heading>
      <Tasks>
        {todos.map((todo) => (
          <Task
            key={todo.id}
            todo={todo}
            onClick={() => {
              setSelectedTodo(todo);
              setOpenTaskView(true);
            }}
          />
        ))}
      </Tasks>
    </Container>
  );
};

const Container = styled.div`
  width: 45vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0px 4vw;

  @media (max-width: 500px) {
    position: fixed;
    width: 80vw;
  }
`;

const Heading = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

  h1 {
    margin: 0;
    font-family: "SF-Heavy";
    font-size: 40px;
  }
`;

const Counter = styled.span`
  background-color: #f6f6f6;
  font-size: 28px;
  font-family: monospace;
  /* font-weight: bold; */
  padding: 5px;
  border-radius: 3px;
  margin-left: 24px;
`;

const BurgerIcon = styled(FaBars)`
  font-size: 1.5em;
  cursor: pointer;
  position: fixed;
  right: 10vw;

  @media (min-width: 500px) {
    display: none;
  }
`;

const Tasks = styled.div`
  width: 100%;
  margin-top: 26px;
  /* background-color: gray; */
  overflow-y: scroll;

  /* Scrollbar styles for Webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dcdcdc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Scrollbar styles for Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: black transparent;
  }

  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
  }
`;

export default TaskView;
