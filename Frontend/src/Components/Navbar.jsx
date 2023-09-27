import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <Link to={isAuthenticated ? "/tasks" : "/registro"}>
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
        {isAuthenticated ? (
          <>
            {/* <li>Bienvenido {user.username}</li> */}
            <li>
              <Link to="/add-task">Nueva tarea</Link>
            </li>
            <li>
              <Link to="/tasks">Tareas</Link>
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
