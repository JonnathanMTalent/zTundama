import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useCitasGeneral } from "../context/CitasGeneralContext.jsx";
import TomarCitaCard from "../TomarCitaCard.jsx";
import "../styles/taskPage.css";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CitasGeneral() {
  const [filtroMedico, setFiltroMedico] = useState("");
  const [filtroHora, setFiltroHora] = useState("");
  const [filtroLugar, setFiltroLugar] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [citasFiltradas, setCitasFiltradas] = useState([]);
  //   const [citasGeneral, setCitasGeneral] = useState([]); // Reemplaza con tu fuente de datos de citas generales

  // Función para filtrar citas generales
  function filtrarCitasGenerales(citasGenerales) {
    return citasGenerales.filter((citaGeneral) => {
      const fechaFormateada = dayjs(citaGeneral.fecha)
        .utc()
        .format("DD/MM/YYYY");
      const horaYlugar = `${citaGeneral.hora.toLowerCase()}`;
      return (
        citaGeneral.doctor.toLowerCase().includes(filtroMedico.toLowerCase()) &&
        horaYlugar.includes(filtroHora.toLowerCase()) &&
        horaYlugar.includes(filtroLugar.toLowerCase()) &&
        fechaFormateada.includes(filtroFecha)
      );
    });
  }

  //   const { user } = useAuth();
  const { getCitasGeneral, citasGeneral } = useCitasGeneral();
  console.log("estas son las citasGeneral:", citasGeneral);
  useEffect(() => {
    getCitasGeneral();
  }, []);

  useEffect(() => {
    const citasFiltradas = filtrarCitasGenerales(citasGeneral);
    setCitasFiltradas(citasFiltradas);
  }, [filtroMedico, filtroHora, filtroLugar, filtroFecha]);

  if (citasGeneral.length === 0) return <h1>No hay citas en el momento.</h1>;
  //   return (
  //     <div>
  //       {citasGeneral.map((citaGeneral) => (
  //         <div key={citaGeneral._id}>    // esto es para los componentes renderizados.
  //           <h1> {citaGeneral.title}</h1>
  //           <p>{citaGeneral.description}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );

  return (
    <div>
      <div className="search-input">
        <input
          type="search"
          placeholder="Filtrar por Médico"
          value={filtroMedico}
          onChange={(e) => setFiltroMedico(e.target.value)}
        />
        <input
          type="search"
          placeholder="Filtrar por Hora"
          value={filtroHora}
          onChange={(e) => setFiltroHora(e.target.value)}
        />
        <input
          type="search"
          placeholder="Filtrar por Lugar"
          value={filtroLugar}
          onChange={(e) => setFiltroLugar(e.target.value)}
        />

        <input
          type="search"
          placeholder="Filtrar por Fecha"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </div>
      <div className="divGrid">
        {citasFiltradas.map((citaGeneral) => (
          <TomarCitaCard citaGeneral={citaGeneral} key={citaGeneral._id} />
        ))}
      </div>
    </div>
  );
}

export default CitasGeneral;
