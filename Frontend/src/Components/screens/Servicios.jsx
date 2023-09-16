import React from "react";
import { Link } from "react-router-dom";
import "../styles/servicios.css";

const Servicios = () => {
  return (
    <body>
      <center>
        <h2>Nuestros servicios:</h2>
      </center>
      <div className="formu">
        <div className="formu__form">
          <div className="servicio">
            <Link to={"/registro"}>Servicio 1</Link>
          </div>
          <div className="servicio">
            <Link to={"/registro"}>Servicio 2</Link>
          </div>
          <div className="servicio">
            <Link to={"/registro"}>Servicio 3</Link>
          </div>
          <div className="servicio">
            <Link to={"/registro"}>Servicio 4</Link>
          </div>
          <div className="servicio">
            <Link to={"/registro"}>Servicio 5</Link>
          </div>
          <div className="servicio">
            <Link to={"/login"}>Ingresar Usuario: Login</Link>
          </div>
          <center>
            <button
              className="volver btn-block"
              type="button"
              // style={{ color: "black", backgroundColor: "rgb(13, 97, 97)" }}
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </center>
        </div>
      </div>
    </body>
  );
};

export default Servicios;
