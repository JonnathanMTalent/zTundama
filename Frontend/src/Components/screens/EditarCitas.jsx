import { Outlet, Link } from "react-router-dom";
import React from "react";
import "../styles/editarCita.css";

function EditarCitas() {
  React.useEffect(() => {
    // Obtener la tabla y sus celdas
    var tabla = document.getElementById("citas");
    var celdas = tabla.getElementsByTagName("td");

    // Cargar citas tomadas desde el local storage
    var citasTomadas =
      JSON.parse(localStorage.getItem("DatosRegistro")).citas || [];

    // Marcar las celdas correspondientes a citas tomadas
    for (var i = 0; i < citasTomadas.length; i++) {
      var citaTomada = citasTomadas[i];
      var fila = citaTomada.fila;
      var columna = citaTomada.columna;
      var celda = tabla.rows[fila].cells[columna];
      celda.classList.remove("unavailable");
      celda.classList.add("available");
      celda.innerText = "Cancelar cita";
      tabla.rows[fila].cells[columna - 1].innerText = citaTomada.hora;
      tabla.rows[fila].cells[columna - 2].innerText = citaTomada.fecha;
      tabla.rows[fila].cells[columna - 3].innerText = citaTomada.doctor;
      tabla.rows[fila].cells[columna - 4].innerText = citaTomada.lugar;
    }

    // Asignar evento onclick a las celdas disponibles
    for (var i = 0; i < celdas.length; i++) {
      var celda = celdas[i];
      if (celda.classList.contains("available")) {
        celda.onclick = function () {
          var fila = this.parentNode.rowIndex;
          var columna = this.cellIndex;
          cancelarCita(fila, columna);
        };
      }
    }

    // Función para cancelar una cita
    function cancelarCita(fila, columna) {
      var celda = tabla.rows[fila].cells[columna];
      celda.classList.remove("available");
      celda.classList.add("unavailable");
      celda.removeAttribute("onclick");
      celda.innerText = "Cancelada";

      // Filtramos la cita cancelada y modificamos el JSON en la local storage
      let obj = JSON.parse(localStorage.getItem("DatosRegistro"));
      obj.citas = obj.citas.filter((elem) => elem.fila !== fila);
      localStorage.setItem("DatosRegistro", JSON.stringify(obj));
    }
  }, []); // Agregamos el arreglo vacío como dependencia para que se ejecute solo una vez

  return (
    <div>
      <a name="arriba"></a>
      <header>
        <center>
          <h1>Cancelar Citas</h1>
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
              <th role="columnheader">Opción</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row">
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td className="available"></td>
            </tr>
            <tr className="available">
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td className="available"></td>
            </tr>
            <tr>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td className="available"></td>
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
            <Link className="btn btn-info" to={"/agendaCitas"}>
              Tomar cita
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
      <script src="../js/editarCita.js"></script>
    </div>
  );
}

export default EditarCitas;
