import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import MenuItem from "./MenuItem";

interface MenuProps {
  selectedMenuItem: string | null;
  setSelectedMenuItem: (name: string) => void;
  addTask: () => void;
}

const Menu: React.FC<MenuProps> = ({
  selectedMenuItem,
  setSelectedMenuItem,
  addTask,
}) => {
  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name);
  };

  return (
    <Container>
      <Heading>
        <h2>Menu</h2>
        <BurgerIcon />
      </Heading>
      <Content>
        <Title>TASKS</Title>
        <MenuItem
          name="All tasks"
          color="green"
          selected={selectedMenuItem === "tAll"}
          onClick={() => handleMenuItemClick("tAll")}
        />
        <MenuItem
          name="To Do"
          color="green"
          selected={selectedMenuItem === "tToDo"}
          onClick={() => handleMenuItemClick("tToDo")}
        />
        <MenuItem
          name="Completed"
          color="green"
          selected={selectedMenuItem === "tCompleted"}
          onClick={() => handleMenuItemClick("tCompleted")}
        />
        <MenuItem
          name="High"
          color="#ff4d4d"
          selected={selectedMenuItem === "pHigh"}
          onClick={() => handleMenuItemClick("pHigh")}
        />
        <MenuItem
          name="Medium"
          color="#ffff5a"
          selected={selectedMenuItem === "pMedium"}
          onClick={() => handleMenuItemClick("pMedium")}
        />
        <MenuItem
          name="Low"
          color="#42ff42"
          selected={selectedMenuItem === "pLow"}
          onClick={() => handleMenuItemClick("pLow")}
        />
        <MenuButton onClick={addTask}>
          <PlusIcon />
          <span>Add New Task</span>
        </MenuButton>

        <br />
        <br />
        <Title>LISTS</Title>
        <MenuItem
          name="Personal"
          color="purple"
          selected={selectedMenuItem === "lPersonal"}
          onClick={() => handleMenuItemClick("lPersonal")}
        />
        <MenuItem
          name="Work"
          color="blue"
          selected={selectedMenuItem === "lWork"}
          onClick={() => handleMenuItemClick("lWork")}
        />
        <MenuButton>
          <PlusIcon />
          <span>Add New List</span>
        </MenuButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f6f6f6;
  height: 100vh;
  padding: 0px 15px;
  margin: 0;
  width: 20vw;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  /* margin: 0px 15px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  /* background-color: aqua; */

  h2 {
    font-family: "SF-Medium";
    font-weight: normal;
    color: #535353;
  }
`;

const BurgerIcon = styled(FaBars)`
  font-size: 1.5em;
  cursor: pointer;
`;

const PlusIcon = styled(FaPlus)`
  font-size: 1.2em;
  cursor: pointer;
  color: #444;
  margin-right: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Title = styled.span`
  font-family: "SF-Black";
  font-size: 12px;
  color: #535353;
`;

const MenuButton = styled.button`
  width: 97%;
  display: flex;
  justify-content: left;
  align-items: center;
  border: none;
  padding: 10px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  background-color: transparent;

  &:hover {
    background-color: #dcdcdc;
  }

  span {
    font-family: "SF-Bold";
    color: #535353;
  }
`;

export default Menu;
