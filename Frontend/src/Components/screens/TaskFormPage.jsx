// import React from "react";
import { useForm } from "react-hook-form"; // esta libreria ejecuta el formulario de forma facil
import { useTasks } from "../context/TasksContext";
import "../styles/taskFormPage.css";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  //   const { tasks, createTask } = useTasks();
  const { tasks, createTask } = useTasks();
  //   console.log("tarea del Form Exportada del contexto:", tasks);
  //   console.log("CreateTask del Form Exportado del contexto:", createTask());

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    createTask(data); // estamos creando la tarea en la base de datos de mongo
  });

  return (
    <body>
      <div className="div1">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("title")}
            className=""
            autoFocus
            placeholder="Título de la tarea"
          />
          <textarea
            cols="3"
            rows="3"
            placeholder="Descripcion"
            {...register("description")}
          ></textarea>
          <button className="guardar">Guardar</button>
        </form>
      </div>
    </body>
  );
}

export default TaskFormPage;
