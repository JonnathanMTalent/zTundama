import { createContext, useContext, useState } from "react";

const CitaContext = createContext();

export const useCitas = () => {
  const context = useContext(CitaContext);
  if (!context) {
    throw new Error("useCitas debe ser usado con un Citas provider");
  }
  return context;
};

export function CitaProvider({ children }) {
  const [citas, setCitas] = useState([]);
  const createCita = async (cita) => {
    console.log("cita");
  };

  return (
    <CitaContext.Provider value={{ citas, createCita }}>
      {children}
    </CitaContext.Provider>
  );
}
