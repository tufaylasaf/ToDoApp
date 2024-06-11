// src/todoService.ts

interface ToDo {
  id: number;
  title: string;
  description: string;
}

const API_BASE_URL = "http://localhost:5210/api/ToDo";

export const getToDos = async (): Promise<ToDo[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const getToDo = async (id: number): Promise<ToDo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  return response.json();
};

export const addToDo = async (todo: ToDo): Promise<ToDo[]> => {
  const response = await fetch(API_BASE_URL, {
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

export const updateToDo = async (todo: ToDo): Promise<ToDo> => {
  const response = await fetch(API_BASE_URL, {
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

export const deleteToDo = async (id: number): Promise<ToDo[]> => {
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  return response.json();
};
