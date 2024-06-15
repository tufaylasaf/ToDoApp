import React, { useState } from "react";
import styled from "styled-components";
import { registerUser } from "../todoService";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";

const emptyUser: User = {
  userName: "",
  email: "",
  password: "",
};

const SignUp: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await registerUser(user);
    console.log(response);
    if (response != null) navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <Container>
      <Wrapper>
        <h1>SIGN UP</h1>
        <Form onSubmit={handleRegister}>
          <InputContainer>
            <Label htmlFor="userName">Username</Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
          <RegisterButton type="submit">Register</RegisterButton>
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
  height: 75vh;
`;

const Wrapper = styled.div`
  background-color: #f6f6f6;
  width: 45vw;
  height: fit-content;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: 24px;
  h1 {
    font-family: "SF-Heavy";
    font-weight: normal;
    font-size: 42px;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: "SF-Regular";
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-family: "SF-Heavy";
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export default SignUp;
