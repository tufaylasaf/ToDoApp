import React, { useState } from "react";
import styled from "styled-components";
import { User } from "../models/User";
import { loginUser } from "../todoService";
import { useNavigate } from "react-router-dom";

const emptyUser: User = {
  userName: "",
  email: "",
  password: "",
};

const SignIn: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginUser(user);
    if (response != null) navigate("/home");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <Container>
      <Wrapper>
        <h1>Log in to your Account</h1>
        <h2>To view your Tasks</h2>
      </Wrapper>
      <Wrapper>
        <Form onSubmit={handleSignIn}>
          <InputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </InputContainer>
          <RegisterButton type="submit">Log In</RegisterButton>
          <span>
            Don't have an account?
            <br />
            <a href="/register">Register Now</a>
          </span>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  background-color: #f6f6f6;
  width: 22.5vw;
  height: 35vh;
  /* border-radius: 8px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  h1 {
    font-family: "SF-Heavy";
    font-weight: normal;
    font-size: 42px;
    margin-bottom: 24px;
  }

  @media (max-width: 500px) {
    width: 75vw;
    height: 40vh;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.label`
  font-family: "SF-Heavy";
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  /* border-radius: 4px; */
  outline: none;
  border-bottom: 2px solid darkgray;
  font-size: 16px;
  font-family: "SF-Regular";
  &:focus {
    border-bottom-color: #212121;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 24px;
  background-color: black;
  color: white;
  font-size: 18px;
  font-family: "SF-Heavy";
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3a3a3a;
  }
`;

export default SignIn;
