import { createContext, useState, useContext } from "react";
import { registerRequest } from "../../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  // con esto podemos usar authContext y useContext con una sola importacion
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado con un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Este es el usuario que podra usarse dentro de todo el contexto. Cuando ejecutemos un register o un login el setUser sera modificado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // con esta variable de estado validamos la autenticacion
  const [errors, setErrors] = useState([]);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log("esto es el res", res.data);
      setUser(res.data); // establece en la variable de estado lo que vino en la respuesta en el data.
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message); // esta es la ubicacion del error en el json que viene como respuesta.
    }
  };
  // en este valor de value podemos poner cualquier cosa, array, string, num
  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
