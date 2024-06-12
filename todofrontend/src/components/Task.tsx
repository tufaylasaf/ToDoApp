import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

interface TaskProps {
  title: string;
  onClick: () => void;
}

const Task: React.FC<TaskProps> = ({ title, onClick }) => {
  return (
    <Container onClick={onClick}>
      <StyledCheckbox type="checkbox" id={title} />
      <Title>{title}</Title>
      <ArrowIcon />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-top: 2px solid #f6f6f6;
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
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
  margin-left: 8px;
  font-size: 15px;
`;

const ArrowIcon = styled(IoIosArrowForward)``;

export default Task;
