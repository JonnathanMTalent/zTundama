// import React from "react";
import { useForm } from "react-hook-form"; // esta libreria ejecuta el formulario de forma facil
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/taskFormPage.css";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  //   const { tasks, createTask } = useTasks();
  //   const { tasks, createTask, getTask, updateTask } = useTasks();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams(); // trae los parémetros de la url
  var confirma = true;
  //   console.log("tarea del Form Exportada del contexto:", tasks);
  //   console.log("CreateTask del Form Exportado del contexto:", createTask());

  //   useEffect(() => {
  //     // console.log(params);
  //     if (params.id) {
  //     getTask(params.id);
  //     }
  //   }, []);

  useEffect(() => {
    async function loadTask() {
      // esta funcion se usa para poder hacer el llamado asyncrono en el useEffect.
      if (params.id) {
        // si la url tiene el parámetro id...
        const task = await getTask(params.id); // obtiene la task a travez del parametro id que trae la url.
        console.log(task);
        // setValue("title");  //muestra lo que viene en title
        setValue("title", task.title); // aqui establecemos el valor que venia en el elemento title de la tarea a editar y lo penemos en el form
        setValue("description", task.description); // aqui establecemos el valor que venia en el elemento description  de la tarea a editar y lo penemos en el form
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD")); // aqui establecemos el valor que venia en el elemento date  de la tarea a editar y lo penemos en el form
      }
    }
    loadTask();
  }, []);

  // //* En este on submit verificamos si hay un parametro, para asi saber si va a editar el elemento o la va a generar.
  //   const onSubmitInicial = handleSubmit((data) => {
  //     if (params.id) {
  //       // si existe un id en el parametro de la url entonces estamos editando.
  //       //   updateTask(params.id, data);
  //       updateTask(params.id, {
  //         ...data,
  //         date: dayjs.utc(data.date).format(),
  //       });
  //     } else {
  //       // console.log(data);
  //       //   createTask(data); // estamos creando la tarea en la base de datos de mongo
  //       if (!data.date || !data.title || !data.description)
  //         return alert("No puede haber campos vacios, y debe escoger una fecha.");
  //       createTask({
  //         ...data,
  //         date: dayjs.utc(data.date).format(),
  //       }); // estamos creando la tarea en la base de datos de mongo
  //       //   navigate("/tasks"); // lineas antes de el if-else
  //     }
  //     navigate("/tasks");
  //   });

  //*En este on submit verificamos si hay un parametro, para asi saber si va a editar el elemento o la va a generar.
  //*SUBMIT colocando fecha vacia como la actual,..y dataValid
  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (params.id) {
      // si existe un id en el parametro de la url entonces estamos editando.
      //   updateTask(params.id, data);
      updateTask(params.id, dataValid);
    } else {
      // console.log(data);
      //   createTask(data); // estamos creando la tarea en la base de datos de mongo
      if (!data.title || !data.description)
        return alert("No puede haber campos vacios, y debe escoger una fecha.");
      if (!data.date)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma) createTask(dataValid); // estamos creando la tarea en la base de datos de mongo
    }
    if (confirma) navigate("/tasks"); //   navigate("/tasks"); // lineas antes de el if-else
  });

  return (
    <body>
      <div className="div1">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            {...register("title")}
            className=""
            autoFocus
            placeholder="Título de la tarea"
          />
          <label htmlFor="description">Descripcion</label>
          <textarea
            cols="3"
            rows="3"
            placeholder="Descripcion"
            {...register("description")}
          ></textarea>
          <label htmlFor="date">Fecha</label>
          <input type="date" {...register("date")} />
          <button className="guardar">Guardar</button>
        </form>
      </div>
    </body>
  );
}

export default TaskFormPage;
