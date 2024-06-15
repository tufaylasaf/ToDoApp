import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { changeStatus } from "../todoService";
import { ToDo } from "../models/ToDo";

interface TaskProps {
  todo: ToDo;
  onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ todo, onClick }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleCheckboxChange = async () => {
    const updatedTodo = await changeStatus(todo);
    todo.completed = !todo.completed;
    setIsChecked(updatedTodo.completed);
    console.log(updatedTodo);
  };

  return (
    <Container onClick={onClick}>
      <Main>
        <div>
          <StyledCheckbox
            type="checkbox"
            id={todo.title}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <Title completed={todo.completed}>{todo.title}</Title>
        </div>
        <ArrowIcon />
      </Main>
      <Extra>
        {todo.dueDate !== "" && (
          <Date>
            <FaRegCalendarAlt />
            {todo.dueDate}
          </Date>
        )}
      </Extra>
    </Container>
  );
};

const Container = styled.div`
  width: 97%;
  border-top: 2px solid #f6f6f6;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  cursor: pointer;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
`;

const Extra = styled.div`
  margin: 3px 0px 0px 0px;
`;

const Date = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  margin-left: 32px;
  gap: 4px;
  transition: all 0.25s ease-in-out;
  background-color: #f6f6f6;
  padding: 3px 6px;
  border-radius: 5px;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  transition: background-color 150ms;

  &:checked {
    background-color: #4caf50;
    border: 1px solid #4caf50;
  }

  &:checked::after {
    content: "✔";
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
`;

const Title = styled.span<{ completed: boolean }>`
  /* margin-left: 8px; */
  font-size: 15px;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const ArrowIcon = styled(IoIosArrowForward)``;

export default Task;
