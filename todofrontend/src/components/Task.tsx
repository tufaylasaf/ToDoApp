import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { changeStatus } from "../todoService";

interface ToDo {
  id?: number | undefined;
  title: string;
  description: string;
  priority: string;
  dueDate?: string;
  completed: boolean;
}

interface TaskProps {
  todo: ToDo;
  onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ todo, onClick }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleCheckboxChange = async () => {
    const updatedTodo = await changeStatus(todo);
    setIsChecked(updatedTodo.completed);
    console.log(updatedTodo);
  };

  return (
    <Container onClick={onClick}>
      <div>
        <StyledCheckbox
          type="checkbox"
          id={todo.title}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Title>{todo.title}</Title>
      </div>
      <ArrowIcon />
    </Container>
  );
};

const Container = styled.div`
  width: 97%;
  border-top: 2px solid #f6f6f6;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
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

const Title = styled.span`
  /* margin-left: 8px; */
  font-size: 15px;
`;

const ArrowIcon = styled(IoIosArrowForward)``;

export default Task;
