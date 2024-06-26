import toast from "react-hot-toast";
import { ToDo } from "./models/ToDo";
import { User } from "./models/User";
import { error } from "console";

const API_BASE_URL = "https://tufayltodoapi.azurewebsites.net";
// const API_BASE_URL = "http://localhost:5210";

// Fetches the list of ToDo items for a specific user.
export const getToDos = async (
  userName: string | undefined
): Promise<ToDo[]> => {
  const response = await fetch(
    `${API_BASE_URL}/ToDo/user?username=${userName}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

// Fetches a specific ToDo item by its ID.
export const getToDo = async (id: number): Promise<ToDo> => {
  const response = await fetch(`${API_BASE_URL}/ToDo/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  return response.json();
};

// Adds a new ToDo item.
export const addToDo = async (todo: ToDo): Promise<ToDo> => {
  const response = await fetch(`${API_BASE_URL}/ToDo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return response.json();
};

// Updates an existing ToDo item.
export const updateToDo = async (todo: ToDo): Promise<ToDo> => {
  const response = await fetch(`${API_BASE_URL}/ToDo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

// Deletes a specific ToDo item.
export const deleteToDo = async (todo: ToDo): Promise<ToDo[]> => {
  const response = await fetch(`${API_BASE_URL}/ToDo/${todo.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  return response.json();
};

// Changes the status of a specific ToDo item.
export const changeStatus = async (todo: ToDo): Promise<ToDo> => {
  const response = await fetch(`${API_BASE_URL}/ToDo/status/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to change status");
  }
  return response.json();
};

// Registers a new user.
export const registerUser = async (user: User): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/User`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      toast.error(await response.text());
      return null;
    }

    toast.success("Registered Successfully, Welcome!");
    return response.json();
  } catch (error) {
    console.error("Error occurred while adding User:", error);
    return null;
  }
};

// Logs in an existing user.
export const loginUser = async (user: User): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      toast.error(await response.text());
      return null;
    }

    toast.success("Login successfull");

    const data = await response.json();
    localStorage.setItem("authToken", data.userName);

    return data;
  } catch (error) {
    console.error("Error occurred while logging in:", error);
    return null;
  }
};

// Fetches a user by username.
export const getUser = async (userName: string): Promise<User | null> => {
  const response = await fetch(`${API_BASE_URL}/User/${userName}`);

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  const data = await response.json();
  return data;
};

// Fetches the counts of completed, incomplete, and priority tasks for a specific user.
export const getCounts = async (
  userName: string | undefined
): Promise<number[]> => {
  const response = await fetch(`${API_BASE_URL}/ToDo/GetCounts/${userName}`);

  if (!response.ok) {
    console.log(await response.text());
  }

  const data = await response.json();
  return data;
};
