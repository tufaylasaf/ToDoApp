# ToDo Application

Welcome to the ToDo Application! This is a simple yet powerful task management application that helps you keep track of your tasks efficiently. The project consists of a frontend built with React and a backend built with .NET Core.

## Live Demo

- **Frontend (Website)**: [ToDo Application](https://tufayltodoapp.vercel.app/) (deployed using Vercel)
- **Backend (API)**: [ToDo API](https://tufayltodoapi.azurewebsites.net/swagger/index.html) (deployed using Azure)

The site is mobile responsive for ease of use on any device.

## Features

- **Task Management**: Add, update, delete, and mark tasks as completed.
- **User Authentication**: Register and log in to manage your tasks.
- **Task Filtering**: Filter tasks based on status and priority.
- **Responsive Design**: Mobile-friendly design for easy access on the go.

## Getting Started

### Running the Project Locally

To run the project locally, follow these steps:

### Frontend

1. **Clone the repository**:
    ```sh
    git clone https://github.com/tufaylasaf/ToDoApp.git
    ```

2. **Navigate to the frontend directory**:
    ```sh
    cd todofrontend
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Start the frontend server**:
    ```sh
    npm start
    ```

By default, the frontend will call the APIs from the deployed backend at the link mentioned above. If you want to run the backend locally, follow the steps below.

### Backend

1. **Ensure you have .NET 8.0 or above installed**:
    - **Check your .NET version**:
        ```sh
        dotnet --version
        ```
    - **Install .NET 8.0 or above**:
        - Download and install the latest version of .NET SDK from the official [.NET download page](https://dotnet.microsoft.com/download).

2. **Navigate to the backend directory**:
    ```sh
    cd ToDoApi
    ```

3. **Start the backend server**:
    ```sh
    dotnet watch
    ```
       
4. **Connect the frontend to the local backend**:
    - Comment the 6th line in the file `todofrontend/src/todoService.tsx`.
    - Uncomment the 7th line in the file `todofrontend/src/todoService.tsx` to connect to the local backend.

## Deployment

The application has been deployed to make it easy for you to use without setting up locally:

- **Frontend**: Deployed using [Vercel](https://tufayltodoapp.vercel.app/).
- **Backend**: Deployed using [Azure](https://tufayltodoapi.azurewebsites.net/swagger/index.html).
