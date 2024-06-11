import React from "react";
import styled from "styled-components";
import Task from "./Task";

function TaskView() {
  return (
    <Container>
      <Heading>
        <h1>In Progress</h1>
        <Counter>17</Counter>
      </Heading>
      <Tasks>
        <Task />
        <Task />
        <Task />
        <Task />
      </Tasks>
    </Container>
  );
}

const Container = styled.div`
  width: 50vw;
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
`;

export default TaskView;
