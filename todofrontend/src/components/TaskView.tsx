import React from "react";
import styled from "styled-components";
import Task from "./Task";

interface ToDo {
  id?: number;
  title: string;
  description: string;
}

interface TaskViewProps {
  todos: ToDo[];
  selectedMenuItem: string;
  setSelectedTodo: React.Dispatch<React.SetStateAction<ToDo>>;
}

const TaskView: React.FC<TaskViewProps> = ({
  todos,
  selectedMenuItem,
  setSelectedTodo,
}) => {
  const heading: string = selectedMenuItem.slice(1);

  return (
    <Container>
      <Heading>
        <h1>{heading}</h1>
        <Counter>17</Counter>
      </Heading>
      <Tasks>
        {todos.map((todo) => (
          <Task
            key={todo.id}
            title={todo.title}
            onClick={() => setSelectedTodo(todo)}
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
  /* justify-content: center; */
  align-items: start;
  /* background-color: #bbb; */
  /* padding-left: 16px; */
  margin: 0px 4vw;
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
