import "./styles/taskCard.css";
import { useTasks } from "../Components/context/TasksContext.jsx";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="divCard">
      <header>
        <h1> {task.title}</h1>
      </header>
      <p>{task.description}</p>
      {/* <p>{new Date(task.date).toLocaleDateString()}</p> */}
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
      <div className="divBoton">
        <button
          className="botonCard"
          onClick={() => {
            //   console.log(task._id);
            deleteTask(task._id);
          }}
        >
          Borrar
        </button>
        <button className="botonCard">
          <Link className="link" to={`/tasks/${task._id}`}>
            Editar
          </Link>
        </button>
        {/* // aqui estamosredirigiendo hacia el formulario donde se originan las task para queleugo a travez de la url con el id detecte si es una tarea nueva ouna edicion; */}
      </div>
    </div>
  );
}

export default TaskCard;
