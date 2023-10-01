// https://react-bootstrap.github.io/docs/components/navbar#home

// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles/navbar.css";
import { useAuth } from "./context/AuthContext";

function NavScrollExample() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-black navbar">
      <Container fluid>
        <Navbar.Brand href="/inicio" className="text-white">
          {isAuthenticated ? (
            <h1 className="navh1">Bienvenido {user.username}</h1>
          ) : (
            <div className="bienvenido">
              <div className="botonReg">Registrarse</div>
              <p>Bienvenido a Tundama!</p>
            </div>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navbar"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {isAuthenticated && user.username == "jonnathan" && (
              <Nav.Link href="/generarCitasGeneral" className="text-white">
                <li>Generar Citas</li>
              </Nav.Link>
            )}

            {isAuthenticated ? (
              <>
                <NavDropdown
                  title="Acciones"
                  id="navbarScrollingDropdown"
                  color="white"
                >
                  <NavDropdown.Item href="/citasGeneral">
                    Tomar Cita
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/citasGeneralUser">
                    Mis citas
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/add-task">
                    Nueva Tarea
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/tasks">Mis tareas</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/inicio" className="text-black">
                  Inicio
                </Nav.Link>
                <Nav.Link href="/contactForm" className="text-black">
                  Contáctanos
                </Nav.Link>
                <Nav.Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Cerrar sesion
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/contactForm" className="text-white">
                  Contáctanos
                </Nav.Link>
                <Nav.Link href="/" className="text-white">
                  Index
                </Nav.Link>
                <Nav.Link href="/login" className="text-white">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
