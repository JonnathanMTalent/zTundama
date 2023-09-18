import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../../api/auth";

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

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        // validamos si la respuesta viene en un array porque si no es asi lo metemos luego en un array para que no genere error.
        return setErrors(error.response.data.message);
      } else {
        return setErrors([error.response.data.message]);
      }
    }
  };

  // quitamos el mensaje de error luego de unos segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer); // con esto quitamos el intervalo si ya el usuario no esta en la pagina
    }
  }, [errors]);

  // en este valor de value podemos poner cualquier cosa, array, string, num
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
