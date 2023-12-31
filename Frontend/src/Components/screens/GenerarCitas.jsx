// import React from "react";
import { useForm } from "react-hook-form"; // esta libreria ejecuta el formulario de forma facil
import { useCitas } from "../context/CitasContext";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/taskFormPage.css";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function GenerarCitas() {
  const { register, handleSubmit, setValue } = useForm();
  //   const { citas, createCita } = useCitas();
  //   const { citas, createCita, getCita, updateCita } = useCitas();
  const { createCita, getCita, updateCita } = useCitas();
  const navigate = useNavigate();
  const params = useParams(); // trae los parémetros de la url
  var confirma = true;
  //   console.log("tarea del Form Exportada del contexto:", citas);
  //   console.log("CreateCita del Form Exportado del contexto:", createCita());

  //   useEffect(() => {
  //     // console.log(params);
  //     if (params.id) {
  //     getCita(params.id);
  //     }
  //   }, []);

  useEffect(() => {
    async function loadCita() {
      // esta funcion se usa para poder hacer el llamado asyncrono en el useEffect.
      if (params.id) {
        // si la url tiene el parámetro id...
        const cita = await getCita(params.id); // obtiene la cita a travez del parametro id que trae la url.
        console.log(cita);
        // setValue("doctor");  //muestra lo que viene en doctor
        setValue("doctor", cita.doctor); // aqui establecemos el valor que venia en el elemento doctor de la tarea a editar y lo penemos en el form
        setValue("hora", cita.hora); // aqui establecemos el valor que venia en el elemento hora  de la tarea a editar y lo penemos en el form
        setValue("fecha", dayjs.utc(cita.fecha).format("YYYY-MM-DD")); // aqui establecemos el valor que venia en el elemento fecha  de la tarea a editar y lo penemos en el form
      }
    }
    loadCita();
  }, []);

  // //* En este on submit verificamos si hay un parametro, para asi saber si va a editar el elemento o la va a generar.
  //   const onSubmitInicial = handleSubmit((data) => {
  //     if (params.id) {
  //       // si existe un id en el parametro de la url entonces estamos editando.
  //       //   updateCita(params.id, data);
  //       updateCita(params.id, {
  //         ...data,
  //         fecha: dayjs.utc(data.fecha).format(),
  //       });
  //     } else {
  //       // console.log(data);
  //       //   createCita(data); // estamos creando la tarea en la base de datos de mongo
  //       if (!data.fecha || !data.doctor || !data.hora)
  //         return alert("No puede haber campos vacios, y debe escoger una fecha.");
  //       createCita({
  //         ...data,
  //         fecha: dayjs.utc(data.fecha).format(),
  //       }); // estamos creando la tarea en la base de datos de mongo
  //       //   navigate("/citas"); // lineas antes de el if-else
  //     }
  //     navigate("/citas");
  //   });

  //*En este on submit verificamos si hay un parametro, para asi saber si va a editar el elemento o la va a generar.
  //*SUBMIT colocando fecha vacia como la actual,..y dataValid
  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      fecha: data.fecha ? dayjs.utc(data.fecha).format() : dayjs.utc().format(),
    };
    if (params.id) {
      // si existe un id en el parametro de la url entonces estamos editando.
      //   updateCita(params.id, data);

      if (!data.doctor || !data.hora)
        return alert("No puede haber campos vacios.");
      if (!data.fecha)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma || data.fecha) updateCita(params.id, dataValid); // estamos actualizando la tarea en la base de datos de mongo
    } else {
      // console.log(data);
      //   createCita(data); // estamos creando la tarea en la base de datos de mongo
      if (!data.doctor || !data.hora)
        return alert("No puede haber campos vacios, y debe escoger una fecha.");
      if (!data.fecha)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma || data.fecha) createCita(dataValid); // estamos creando la tarea en la base de datos de mongo
    }
    if (data.fecha || confirma) navigate("/citas"); //   navigate("/citas"); // lineas antes de el if-else
  });

  return (
    <body>
      <div className="div1">
        <form onSubmit={onSubmit}>
          <label htmlFor="doctor">Nombre del doctor:</label>
          <input
            type="text"
            {...register("doctor")}
            className=""
            autoFocus
            placeholder="Doctor"
          />
          <label htmlFor="hora">Horario de la cita:</label>
          <textarea
            cols="3"
            rows="3"
            placeholder="horario"
            {...register("hora")}
          ></textarea>
          <label htmlFor="fecha">Fecha de la cita:</label>
          <input type="date" {...register("fecha")} />
          <button className="guardar">Guardar</button>
        </form>
      </div>
    </body>
  );
}

export default GenerarCitas;
