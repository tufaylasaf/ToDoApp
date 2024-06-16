import styled from "styled-components";
import { FaBars, FaPlus } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

interface MenuProps {
  selectedMenuItem: string | null;
  addTask: () => void;
  handleMenuItemClick: (name: string) => void;
  openMenu: boolean;
  userName: string | undefined;
  counts: number[];
}

const Menu: React.FC<MenuProps> = ({
  selectedMenuItem,
  addTask,
  handleMenuItemClick,
  openMenu,
  userName,
  counts,
}) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <Container open={openMenu}>
      <Heading>
        <h2>Menu</h2>
      </Heading>
      <Content>
        <Title>TASKS</Title>
        <MenuItem
          name="All"
          color="black"
          selected={selectedMenuItem === "tAll"}
          onClick={() => handleMenuItemClick("tAll")}
          total={counts[0] + counts[1]}
        />
        <MenuItem
          name="To Do"
          color="lightgray"
          selected={selectedMenuItem === "tTo Do"}
          onClick={() => handleMenuItemClick("tTo Do")}
          total={counts[1]}
        />
        <MenuItem
          name="Completed"
          color="darkgray"
          selected={selectedMenuItem === "tCompleted"}
          onClick={() => handleMenuItemClick("tCompleted")}
          total={counts[0]}
        />
        <MenuItem
          name="High"
          color="#ff4d4d"
          selected={selectedMenuItem === "pHigh"}
          onClick={() => handleMenuItemClick("pHigh")}
          total={counts[4]}
        />
        <MenuItem
          name="Medium"
          color="#ffff5a"
          selected={selectedMenuItem === "pMedium"}
          onClick={() => handleMenuItemClick("pMedium")}
          total={counts[3]}
        />
        <MenuItem
          name="Low"
          color="#42ff42"
          selected={selectedMenuItem === "pLow"}
          onClick={() => handleMenuItemClick("pLow")}
          total={counts[2]}
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
      <Footer>
        <MenuButton>
          <ProfileIcon />
          <span>{userName}</span>
        </MenuButton>
        <MenuButton onClick={handleSignOut}>
          <SignOutIcon />
          <span>Sign Out</span>
        </MenuButton>
      </Footer>
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  background-color: #f6f6f6;
  height: 95vh;
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
  width: 100%;
  height: 20%;
  /* background-color: aqua; */

  h2 {
    font-family: "SF-Medium";
    font-weight: normal;
    color: #535353;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 50%;
`;

const PlusIcon = styled(FaPlus)`
  font-size: 1.2em;
  cursor: pointer;
  color: #444;
  margin-right: 8px;
`;

const ProfileIcon = styled(FaRegUser)`
  font-size: 1.2em;
  cursor: pointer;
  color: #444;
  margin-right: 8px;
`;

const SignOutIcon = styled(PiSignOut)`
  font-size: 1.2em;
  cursor: pointer;
  color: #444;
  margin-right: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
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
