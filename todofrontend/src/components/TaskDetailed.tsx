import React, { useState } from "react";
import styled from "styled-components";
import { CgCloseR } from "react-icons/cg";

interface ToDo {
  id?: number;
  title: string;
  description: string;
  priority: string;
  dueDate?: string;
  completed: boolean;
}

interface TaskDetailedProps {
  todo: ToDo;
  setTodo: React.Dispatch<React.SetStateAction<ToDo>>;
  onDelete: () => void;
  onSave: () => void;
  openView: boolean;
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDetailed: React.FC<TaskDetailedProps> = ({
  todo,
  setTodo,
  onDelete,
  onSave,
  openView,
  setOpenView,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  return (
    <Container open={openView}>
      <h2>Task:</h2>
      <CloseButton onClick={() => setOpenView(false)} />
      <Title
        name="title"
        value={todo.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <Description
        name="description"
        value={todo.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <Date>
        <Label htmlFor="date">Due date</Label>
        <StyledDateInput
          type="date"
          id="date"
          onChange={handleChange}
          name="dueDate"
          value={todo.dueDate}
        />
      </Date>
      <Priority>
        <div>
          <Label htmlFor="dropdown">Priority</Label>
          <StyledSelect
            id="dropdown"
            name="priority"
            onChange={handleChange}
            value={todo.priority}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </StyledSelect>
        </div>
        <div>
          <Label htmlFor="list">List</Label>
          <StyledSelect id="list">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </StyledSelect>
        </div>
      </Priority>
      <Buttons>
        <DeleteBtn onClick={onDelete}>Delete Task</DeleteBtn>
        <SaveBtn onClick={onSave}>Save Changes</SaveBtn>
      </Buttons>
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  width: 25vw;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: start;
  background-color: #f6f6f6;
  border-radius: 12px;
  padding: 0px 15px;
  flex-direction: column;
  gap: 10px;
  transition: all 0.35s ease-in-out;

  h2 {
    /* margin: 0; */
    font-family: "SF-Bold";
    font-weight: normal;
    color: #535353;
  }

  @media (max-width: 500px) {
    position: fixed;
    width: 80vw;
    z-index: 2;
    right: ${({ open }) => (open ? "0" : "-90vw")};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const CloseButton = styled(CgCloseR)`
  position: absolute;
  font-size: 24px;
  right: 5vw;
  top: 3vh;
  color: #535353;

  @media (min-width: 500px) {
    display: none;
  }
`;

const Title = styled.input`
  width: 80%;
  background: none;
  outline: none;
  border: none;
  font-family: "SF-Medium";
  font-size: 16px;
  background-color: white;
  padding: 5px 15px;
  border-radius: 3px;
`;

const Description = styled.textarea`
  height: 200px;
  width: 80%;
  background: none;
  outline: none;
  border: none;
  font-family: "SF-Medium";
  font-size: 16px;
  background-color: white;
  padding: 5px 15px;
  resize: none;
  border-radius: 3px;
`;

const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  /* margin-bottom: 8px; */
  font-size: 15px;
  font-family: "SF-Medium";
  color: #535353;
`;

const StyledDateInput = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: "SF-Medium";
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-left: 8px;

  &:hover {
    border-color: #999;
  }

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    /* background: transparent; */
    cursor: pointer;
  }
`;

const Priority = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 16px;
`;

const StyledSelect = styled.select`
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: "SF-Regular";
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  margin-left: 8px;

  &:hover {
    border-color: #999;
  }

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    outline: none;
  }

  option {
    font-family: "SF-Regular";
    color: #333;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 26px;
`;

const DeleteBtn = styled.button`
  width: 35%;
  padding: 12px 0px;
  border-radius: 8px;
  font-family: "SF-Bold";
  border: 2px solid #ccc;
  cursor: pointer;
  background-color: none;
  color: #535353;
`;

const SaveBtn = styled(DeleteBtn)`
  background-color: #ffff38;
  border: none;
`;

export default TaskDetailed;
