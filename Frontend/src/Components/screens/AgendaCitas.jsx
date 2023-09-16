import { Outlet, Link } from "react-router-dom";

import React, { useEffect } from "react";
import "../styles/horarios.css";

function AgendaCitas() {
  useEffect(() => {
    // Obtener la tabla y sus celdas
    const tabla = document.getElementById("citas");
    const celdas = tabla.getElementsByTagName("td");

    // Cargar citas tomadas desde el local storage
    const citasTomadas =
      JSON.parse(localStorage.getItem("DatosRegistro")).citas || [];

    // Marcar las celdas correspondientes a citas tomadas
    for (let i = 0; i < citasTomadas.length; i++) {
      const citaTomada = citasTomadas[i];
      const fila = citaTomada.fila;
      const columna = citaTomada.columna;
      const celda = tabla.rows[fila].cells[columna];
      celda.classList.remove("available");
      celda.classList.add("unavailable");
      celda.innerText = "No disponible";
      celda.removeAttribute("onclick");
    }

    // Asignar evento onclick a las celdas disponibles
    for (let i = 0; i < celdas.length; i++) {
      const celda = celdas[i];
      if (celda.classList.contains("available")) {
        celda.onclick = function () {
          const fila = this.parentNode.rowIndex;
          const columna = this.cellIndex;
          const lugar = this.parentNode
            .querySelector("td:nth-child(1)")
            .textContent.trim();
          const doctor = this.parentNode
            .querySelector("td:nth-child(2)")
            .textContent.trim();
          const fecha = this.parentNode
            .querySelector("td:nth-child(3)")
            .textContent.trim();
          const hora = this.parentNode
            .querySelector("td:nth-child(4)")
            .textContent.trim();
          const idCita = this.parentNode.getAttribute("id");
          tomarCita(fila, columna, lugar, doctor, fecha, hora, idCita);
        };
      }
    }

    // Función para tomar una cita
    function tomarCita(fila, columna, lugar, doctor, fecha, hora, idCita) {
      const celda = tabla.rows[fila].cells[columna];
      celda.classList.remove("available");
      celda.classList.add("unavailable");
      celda.removeAttribute("onclick");
      celda.innerText = "No disponible";

      // Guardar la cita tomada en el local storage
      const citaTomada = {
        fila: fila,
        columna: columna,
        lugar: lugar,
        doctor: doctor,
        fecha: fecha,
        hora: hora,
        idCita: idCita,
      };
      const obj = JSON.parse(localStorage.getItem("DatosRegistro"));
      console.log(obj);
      obj.citas.push(citaTomada);
      localStorage.setItem("DatosRegistro", JSON.stringify(obj));
    }
  }, []);

  return (
    <div>
      <a name="arriba"></a>
      <header>
        <center>
          <h1>Agenda de Citas</h1>
        </center>
      </header>
      <br />
      <br />
      <br />
      <center>
        <table role="table" id="citas">
          <thead role="rowgroup">
            <tr>
              <th role="columnheader">Lugar</th>
              <th role="columnheader">Médico</th>
              <th role="columnheader">Fecha</th>
              <th role="columnheader">Hora</th>
              <th role="columnheader">Disponibilidad</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row" id="cita1">
              <td role="cell">ips estadio</td>
              <td role="cell">Carlos Saens</td>
              <td role="cell">15 nov 2023</td>
              <td role="cell">8:00 am</td>
              <td className="available">Tomar cita</td>
            </tr>
            <tr id="cita2" className="available">
              <td role="cell">ips poblado</td>
              <td role="cell">Andres Valuarte</td>
              <td role="cell">12 oct 2023</td>
              <td role="cell">9:30 am</td>
              <td className="available">Tomar cita</td>
            </tr>
            <tr id="cita3">
              <td role="cell">ips Laureles</td>
              <td role="cell">Andrea Giraldo</td>
              <td role="cell">23 dic 2023</td>
              <td role="cell">3:00 pm</td>
              <td className="available">Tomar cita</td>
            </tr>
            {/* Agrega más filas según sea necesario */}
          </tbody>
        </table>
      </center>
      <br />
      <br />
      <center>
        <nav>
          <center>
            <Link className="btn btn-info" to={"/editarCitas"}>
              Cancelar citas
            </Link>
            <Link className="btn btn-info" to={"/servicios"}>
              Servicios
            </Link>
            <Link className="btn btn-info" to={"/cuentaUsuario"}>
              Cuenta de usuario
            </Link>
            <Link className="btn btn-info" to={"/contactForm"}>
              Contacto
            </Link>
          </center>
        </nav>
      </center>
      <br />
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
      <script src="../js/horarios.js"></script>
    </div>
  );
}

export default AgendaCitas;
