import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function Navbarm() {
  const { isAuthenticated, logout, user } = useAuth();
  //   console.log("El id del usuario es:", user.username, user.id);

  return (
    <>
      <Navbar expand="lg" className="bg-body-black">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
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
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <ul>
                  {isAuthenticated && user.username == "jonnathan" && (
                    <li>
                      <Link to="/generarCitasGeneral">Generar cita</Link>
                    </li>
                  )}

                  {isAuthenticated ? (
                    <>
                      <NavDropdown
                        title="Acciones"
                        id="navbarScrollingDropdown"
                        color="white"
                      >
                        <NavDropdown.Item href="/citasGeneral">
                          Tomar cita
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/citasGeneralUser">
                          Mis citas
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/add-task">
                          Nueva Tarea
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/tasks">
                          Mis tareas
                        </NavDropdown.Item>
                      </NavDropdown>

                      <li>
                        <Link to=""> </Link>
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
              </Nav>
            </nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarm;
