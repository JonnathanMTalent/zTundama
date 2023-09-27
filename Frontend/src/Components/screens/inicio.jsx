import { Outlet, Link } from "react-router-dom";

function Inicio() {
  return (
    <div>
      <a name="arriba"></a>
      {/* <header>
        <center>
          <h1>Bienvenid@ a Tundama</h1>
        </center>
      </header>
      <br />
      <br />
      <br /> */}
      <center>
        <img src="../images/icono.ico" alt="usuario" />
      </center>
      <center>
        <nav>
          <center>
            <Link className="btn btn-info" to={"/editarCitas"}>
              Cancelar Citas
            </Link>
            <Link className="btn btn-info" to={"/agendaCitas"}>
              Agendar citas
            </Link>

            <Link className="btn btn-info" to={"/cuentaUsuario"}>
              Cuenta de usuario
            </Link>
            <Link className="btn btn-info" to={"/contactForm"}>
              Contacto
            </Link>

            <Link className="btn btn-info" to={"/generarCitas"}>
              Generar citas
            </Link>
          </center>
        </nav>
      </center>
      <br />
      <center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <footer>
          <center>
            <button
              className="volver"
              style={{ color: "black", backgroundColor: "rgb(13, 97, 97)" }}
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </center>
          <center>
            <p>
              <h5>Página en Construcción</h5>
            </p>
          </center>
        </footer>
      </center>
    </div>
  );
}

export default Inicio;
