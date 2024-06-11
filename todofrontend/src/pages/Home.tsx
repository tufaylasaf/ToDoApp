import React, { useState } from "react";
import styled from "styled-components";
import Menu from "../components/Menu";
import TaskView from "../components/TaskView";

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(
    "tToDo"
  );

  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name);
  };

  return (
    <Container>
      <Menu
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      <TaskView />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Home;
