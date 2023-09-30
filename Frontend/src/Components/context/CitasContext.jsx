import { createContext, useContext, useState } from "react";
import {
  createCitaRequest,
  getCitasRequest,
  getCitaRequest,
  deleteCitasRequest,
  updateCitasRequest,
} from "../../api/citas.js";

const CitaContext = createContext();

export const useCitas = () => {
  const context = useContext(CitaContext);
  if (!context) {
    throw new Error("useCitas debe ser usado con un citas provider");
  }
  return context;
};

export function CitaProvider({ children }) {
  const [citas, setCitas] = useState([]);

  const getCitas = async () => {
    try {
      const res = await getCitasRequest();
      setCitas(res.data); // aqui estamos poniendo en la variable de estado cita, las cita que estan en la bd mongo.
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const createCita = async (cita) => {
    // console.log("cita! del Citas Context");
    const res = await createCitaRequest(cita);
    console.log(res);
  };

  const deleteCita = async (id) => {
    try {
      const res = await deleteCitasRequest(id);
      // console.log(res.data);
      console.log(res);
      if (res.status === 204) setCitas(citas.filter((cita) => cita._id !== id)); // si la respuesta anterior es 204 entonces establece en el arreglo de tareas el mismo arreglo filtrando la tarea eliminada.
    } catch (error) {
      console.log(error);
    }
  };

  const getCita = async (id) => {
    try {
      const res = await getCitaRequest(id);
      //   console.log(res);
      return res.data; // retornamos los datos de la tarea.
    } catch (error) {
      console.error(error);
    }
  };

  const updateCita = async (id, cita) => {
    // recibe el id de la tarea a editar y los valores nuevos en cita
    try {
      await updateCitasRequest(id, cita);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CitaContext.Provider
      value={{
        citas,
        createCita,
        getCitas,
        getCita,
        deleteCita,
        updateCita,
      }}
    >
      {children}
    </CitaContext.Provider>
  );
}
