import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useTasks } from "../context/TasksContext.jsx";
import TaskCard from "../TaskCard.jsx";
import "../styles/taskPage.css";

function TasksPage() {
  //   const { user } = useAuth();
  const { getTasks, tasks } = useTasks();
  console.log("estas son las tasks:", tasks);
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No hay tareas en el momento.</h1>;
  //   return (
  //     <div>
  //       {tasks.map((task) => (
  //         <div key={task._id}>    // esto es para los componentes renderizados.
  //           <h1> {task.title}</h1>
  //           <p>{task.description}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );

  return (
    <div className="divGrid">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
