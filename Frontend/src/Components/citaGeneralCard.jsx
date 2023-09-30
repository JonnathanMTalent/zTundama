import "./styles/taskCard.css";
import { useCitasGeneral } from "./context/CitasGeneralContext.jsx";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function CitaGeneralCard({ citaGeneral }) {
  const { deleteCitaGeneral } = useCitasGeneral();

  return (
    <div className="divCard">
      <header>
        <h1>Doctor: {citaGeneral.doctor}</h1>
      </header>
      <p>Hora y Lugar: {citaGeneral.hora}</p>
      {/* <p>{new Date(citaGeneral.date).toLocaleDateString()}</p> */}
      <p>Fecha: {days(citaGeneral.fecha).utc().format("DD/MM/YYYY")}</p>
      <div className="divBoton">
        <button
          className="botonCard"
          onClick={() => {
            //   console.log(citaGeneral._id);
            deleteCitaGeneral(citaGeneral._id);
          }}
        >
          Cancelar cita
        </button>
        {/* // aqui estamosredirigiendo hacia el formulario donde se originan las citaGeneral para queleugo a travez de la url con el id detecte si es una tarea nueva ouna edicion; */}
      </div>
    </div>
  );
}

export default CitaGeneralCard;
