import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useCitas } from "../context/CitasContext.jsx";
import CitaCard from "../CitaCard.jsx";
import "../styles/taskPage.css";

function Citas() {
  //   const { user } = useAuth();
  const { getCitas, citas } = useCitas();
  console.log("estas son las citas:", citas);
  useEffect(() => {
    getCitas();
  }, []);

  if (citas.length === 0) return <h1>No hay tareas en el momento.</h1>;
  //   return (
  //     <div>
  //       {citas.map((cita) => (
  //         <div key={cita._id}>    // esto es para los componentes renderizados.
  //           <h1> {cita.title}</h1>
  //           <p>{cita.description}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );

  return (
    <div className="divGrid">
      {citas.map((cita) => (
        <CitaCard cita={cita} key={cita._id} />
      ))}
    </div>
  );
}

export default Citas;
