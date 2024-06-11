import React from "react";
import styled from "styled-components";

interface MenuItemProps {
  name: string;
  color: string;
  selected?: boolean;
  total?: number;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  color,
  selected = false,
  total = 12,
  onClick,
}) => {
  return (
    <Container onClick={onClick} selected={selected}>
      <Name selected={selected}>
        <Box color={color} />
        <span>{name}</span>
      </Name>
      <Total selected={selected}>{total}</Total>
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#dcdcdc" : "transparent")};
  width: 90%;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  transition: all 0.25s ease-in-out;
`;

const Name = styled.span<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.25s ease-in-out;

  span {
    font-family: ${({ selected }) => (selected ? "SF-Bold" : "SF-Medium")};
    font-size: 15px;
    color: ${({ selected }) => (selected ? "#000" : "#444")};
    transition: color all 0.25s ease-in-out;
  }
`;

const Box = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
`;

const Total = styled.span<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#f6f6f6" : "#dcdcdc")};
  font-size: 11px;
  font-family: monospace;
  font-weight: bold;
  padding: 5px;
  border-radius: 3px;
  transition: all 0.25s ease-in-out;
`;

export default MenuItem;
