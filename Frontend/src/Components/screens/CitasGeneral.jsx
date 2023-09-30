import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useCitasGeneral } from "../context/CitasGeneralContext.jsx";
import TomarCitaCard from "../TomarCitaCard.jsx";
import "../styles/taskPage.css";

function CitasGeneral() {
  //   const { user } = useAuth();
  const { getCitasGeneral, citasGeneral } = useCitasGeneral();
  console.log("estas son las citasGeneral:", citasGeneral);
  useEffect(() => {
    getCitasGeneral();
  }, []);

  if (citasGeneral.length === 0) return <h1>No hay tareas en el momento.</h1>;
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
    <div className="divGrid">
      {citasGeneral.map((citaGeneral) => (
        <TomarCitaCard citaGeneral={citaGeneral} key={citaGeneral._id} />
      ))}
    </div>
  );
}

export default CitasGeneral;
