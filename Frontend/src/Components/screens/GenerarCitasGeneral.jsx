// import React from "react";
import { useForm } from "react-hook-form"; // esta libreria ejecuta el formulario de forma facil
import { useCitasGeneral } from "../context/CitasGeneralContext";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/taskFormPage.css";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function GenerarCitasGeneral() {
  const { register, handleSubmit, setValue } = useForm();
  //   const { citasGeneral, createCitaGeneral } = useCitasGeneralGeneral();
  //   const { citasGeneral, createCitaGeneral, getCitaGeneral, updateCitaGeneral } = useCitasGeneral();
  const { createCitaGeneral, getCitaGeneral, updateCitaGeneral } =
    useCitasGeneral();
  const navigate = useNavigate();
  const params = useParams(); // trae los parémetros de la url
  var confirma = true;
  //   console.log("tarea del Form Exportada del contexto:", citasGeneral);
  //   console.log("CreateCitaGeneral del Form Exportado del contexto:", createCitaGeneral());

  //   useEffect(() => {
  //     // console.log(params);
  //     if (params.id) {
  //     getCitaGeneral(params.id);
  //     }
  //   }, []);

  useEffect(() => {
    async function loadCitaGeneral() {
      // esta funcion se usa para poder hacer el llamado asyncrono en el useEffect.
      if (params.id) {
        // si la url tiene el parámetro id...
        const citaGeneral = await getCitaGeneral(params.id); // obtiene la citaGeneral a travez del parametro id que trae la url.
        console.log(citaGeneral);
        // setValue("doctor");  //muestra lo que viene en doctor
        setValue("doctor", citaGeneral.doctor); // aqui establecemos el valor que venia en el elemento doctor de la tarea a editar y lo penemos en el form
        setValue("hora", citaGeneral.hora); // aqui establecemos el valor que venia en el elemento hora  de la tarea a editar y lo penemos en el form
        setValue("fecha", dayjs.utc(citaGeneral.fecha).format("YYYY-MM-DD")); // aqui establecemos el valor que venia en el elemento fecha  de la tarea a editar y lo penemos en el form
      }
    }
    loadCitaGeneral();
  }, []);

  // //* En este on submit verificamos si hay un parametro, para asi saber si va a editar el elemento o la va a generar.
  //   const onSubmitInicial = handleSubmit((data) => {
  //     if (params.id) {
  //       // si existe un id en el parametro de la url entonces estamos editando.
  //       //   updateCitaGeneral(params.id, data);
  //       updateCitaGeneral(params.id, {
  //         ...data,
  //         fecha: dayjs.utc(data.fecha).format(),
  //       });
  //     } else {
  //       // console.log(data);
  //       //   createCitaGeneral(data); // estamos creando la tarea en la base de datos de mongo
  //       if (!data.fecha || !data.doctor || !data.hora)
  //         return alert("No puede haber campos vacios, y debe escoger una fecha.");
  //       createCitaGeneral({
  //         ...data,
  //         fecha: dayjs.utc(data.fecha).format(),
  //       }); // estamos creando la tarea en la base de datos de mongo
  //       //   navigate("/citasGeneral"); // lineas antes de el if-else
  //     }
  //     navigate("/citasGeneral");
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
      //   updateCitaGeneral(params.id, data);

      if (!data.doctor || !data.hora)
        return alert("No puede haber campos vacios.");
      if (!data.fecha)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma || data.fecha) updateCitaGeneral(params.id, dataValid); // estamos actualizando la tarea en la base de datos de mongo
    } else {
      // console.log(data);
      //   createCitaGeneral(data); // estamos creando la tarea en la base de datos de mongo
      if (!data.doctor || !data.hora)
        return alert("No puede haber campos vacios, y debe escoger una fecha.");
      if (!data.fecha)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma || data.fecha) createCitaGeneral(dataValid); // estamos creando la tarea en la base de datos de mongo
    }
    if (data.fecha || confirma) navigate("/citasGeneral"); //   navigate("/citasGeneral"); // lineas antes de el if-else
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
          <label htmlFor="hora">Horario y lugar de la citaGeneral:</label>
          <textarea
            cols="3"
            rows="3"
            placeholder="hh-mm-am---> Ciudad, Barrio, ips"
            {...register("hora")}
          ></textarea>
          <label htmlFor="fecha">Fecha de la citaGeneral:</label>
          <input type="date" {...register("fecha")} />
          <button className="guardar">Guardar</button>
        </form>
      </div>
    </body>
  );
}

export default GenerarCitasGeneral;
