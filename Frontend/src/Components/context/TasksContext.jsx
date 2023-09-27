import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  getTaskRequest,
  deleteTasksRequest,
  updateTasksRequest,
} from "../../api/tasks.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe ser usado con un tasks provider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data); // aqui estamos poniendo en la variable de estado task, las task que estan en la bd mongo.
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    // console.log("task! del Tasks Context");
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      // console.log(res.data);
      console.log(res);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id)); // si la respuesta anterior es 204 entonces establece en el arreglo de tareas el mismo arreglo filtrando la tarea eliminada.
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      //   console.log(res);
      return res.data; // retornamos los datos de la tarea.
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    // recibe el id de la tarea a editar y los valores nuevos en task
    try {
      await updateTasksRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        getTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
