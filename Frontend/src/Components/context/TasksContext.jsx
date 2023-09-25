import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../../api/tasks.js";

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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
