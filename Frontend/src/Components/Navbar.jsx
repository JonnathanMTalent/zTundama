import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  //   console.log("El id del usuario es:", user.username, user.id);

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? "/inicio" : "/registro"}>
        {/* <Link to="/"> */}
        {isAuthenticated ? (
          <h1 className="navh1">Bienvenido {user.username}</h1>
        ) : (
          <div className="bienvenido">
            <div className="botonReg">Registrarse</div>
            <p>Bienvenido a Tundama!</p>
          </div>
        )}
      </Link>
      <ul>
        {isAuthenticated && user.username == "jonnathan" && (
          <li>
            <Link to="/generarCitasGeneral">Generar cita</Link>
          </li>
        )}
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/citasGeneral">tomar cita </Link>
            </li>
            <li>
              <Link to="/citasGeneralUser">Mis citas </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar sesion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Index</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
