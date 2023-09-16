import { Outlet, Link } from "react-router-dom";

import React, { useEffect } from "react";
import "../styles/cuenta.css";
function CuentaUsuario() {
  useEffect(() => {
    // Obtener la tabla y sus celdas
    const tabla = document.getElementById("citas");
    const celdas = tabla.getElementsByTagName("td");

    // Cargar datos tomados desde el local storage
    const datos = JSON.parse(localStorage.getItem("DatosRegistro")) || [];
    const cambiarContrasena = document.getElementById("botonContrasena");
    let nuevaContrasena, nuevaContrasena2, contrasenaValidacion;

    tabla.rows[1].cells[0].innerText = datos.nombres;
    tabla.rows[1].cells[1].innerText = datos.apellidos;
    tabla.rows[1].cells[2].innerText = datos.cedula;
    tabla.rows[1].cells[3].innerText = datos.fecha;
    tabla.rows[1].cells[4].innerText = datos.correo;
    tabla.rows[1].cells[5].innerText = datos.usuario;
    tabla.rows[1].cells[6].innerText = datos.celular;

    cambiarContrasena.addEventListener("click", function () {
      contrasenaValidacion = prompt("Ingrese la contraseña Actual");
      if (contrasenaValidacion === datos.contrasena) {
        nuevaContrasena = prompt(
          "Ingrese la nueva contraseña, mínimo 4 carácteres:"
        );
        if (nuevaContrasena.length > 4) {
          nuevaContrasena2 = prompt("Ingrese nuevamente la nueva contraseña:");
          if (nuevaContrasena === nuevaContrasena2) {
            datos.contrasena = nuevaContrasena2;
            localStorage.setItem("DatosRegistro", JSON.stringify(datos));
            alert("Contraseña cambiada Exitosamente");
          }
        } else {
          alert("La contraseña ingresada no cumple los parámetros");
        }
      } else {
        alert("La contraseña ingresada no es correcta.");
      }
    });
  }, []);

  return (
    <div>
      <a name="arriba"></a>
      <header>
        <center>
          <h1>Cuenta de usuario</h1>
        </center>
      </header>
      <br />
      <br />
      <center>
        <table role="table" id="citas">
          <thead role="rowgroup">
            <tr>
              <th role="columnheader">Nombres</th>
              <th role="columnheader">Apellidos</th>
              <th role="columnheader">Cédula</th>
              <th role="columnheader">Fecha de nacimiento</th>
              <th role="columnheader">Correo</th>
              <th role="columnheader">Usuario</th>
              <th role="columnheader">Celular</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
            </tr>
          </tbody>
        </table>
        <br />
      </center>
      <center>
        <button id="botonContrasena">Cambiar contraseña</button>
      </center>
      <br />
      <center>
        <nav>
          <center>
            <Link className="btn btn-info" to={"/agendaCitas"}>
              Agendar cita
            </Link>
            <Link className="btn btn-info" to={"/servicios"}>
              Servicios
            </Link>
            <Link className="btn btn-info" to={"/registro"}>
              Actualizar datos
            </Link>
            <Link className="btn btn-info" to={"/contactForm"}>
              Contacto
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
      <script src="../js/cuenta.js"></script>
    </div>
  );
}

export default CuentaUsuario;
