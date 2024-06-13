import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import MenuItem from "./MenuItem";

interface MenuProps {
  selectedMenuItem: string | null;
  addTask: () => void;
  handleMenuItemClick: (name: string) => void;
  openMenu: boolean;
}

const Menu: React.FC<MenuProps> = ({
  selectedMenuItem,
  addTask,
  handleMenuItemClick,
  openMenu,
}) => {
  return (
    <Container open={openMenu}>
      <Heading>
        <h2>Menu</h2>
      </Heading>
      <Content>
        <Title>TASKS</Title>
        <MenuItem
          name="All tasks"
          color="white"
          selected={selectedMenuItem === "tAll"}
          onClick={() => handleMenuItemClick("tAll")}
        />
        <MenuItem
          name="To Do"
          color="darkgray"
          selected={selectedMenuItem === "tTo Do"}
          onClick={() => handleMenuItemClick("tTo Do")}
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

const Container = styled.div<{ open: boolean }>`
  background-color: #f6f6f6;
  height: 100vh;
  padding: 0px 15px;
  margin: 0;
  width: 20vw;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: all 0.35s ease-in-out;

  @media (max-width: 500px) {
    position: fixed;
    left: ${({ open }) => (open ? "0" : "-90vw")};
    width: 80vw;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
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
