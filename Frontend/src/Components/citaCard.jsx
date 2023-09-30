import "./styles/taskCard.css";
import { useCitas } from "./context/CitasContext.jsx";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function CitaCard({ cita }) {
  const { deleteCita } = useCitas();

  return (
    <div className="divCard">
      <header>
        <h1> {cita.doctor}</h1>
      </header>
      <p>{cita.hora}</p>
      {/* <p>{new Date(cita.date).toLocaleDateString()}</p> */}
      <p>{days(cita.fecha).utc().format("DD/MM/YYYY")}</p>
      <div className="divBoton">
        <button
          className="botonCard"
          onClick={() => {
            //   console.log(cita._id);
            deleteCita(cita._id);
          }}
        >
          Borrar
        </button>
        <button className="botonCard">
          <Link className="link" to={`/citas/${cita._id}`}>
            Editar
          </Link>
        </button>
        {/* // aqui estamosredirigiendo hacia el formulario donde se originan las cita para queleugo a travez de la url con el id detecte si es una tarea nueva ouna edicion; */}
      </div>
    </div>
  );
}

export default CitaCard;
