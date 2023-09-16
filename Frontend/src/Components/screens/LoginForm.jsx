import "../styles/login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";

function LoginForm() {
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [intentos, setIntentos] = useState(3);
  const handleEyeIconClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = document.getElementById("Correo").value;
    const contrasena = document.getElementById("contrasena").value;

    // Simulando contraseñas de la base de datos
    var contrasenasDeBD = [];

    if (localStorage.getItem("DatosRegistro")) {
      //obtengo los datos de registro del local storage y convierto el json en un objeto.
      var DatosDeLocalStorage = JSON.parse(
        localStorage.getItem("DatosRegistro")
      );
      contrasenasDeBD.push({
        usuario: DatosDeLocalStorage.usuario,
        contrasena: DatosDeLocalStorage.contrasena,
      });
    } else {
      alert(
        "Por favor registre un usuario y clave en el boton '¿Desea registrarse? Recuerde no dejar campos vacios' "
      );
    }
    const Cencontradas = contrasenasDeBD.filter(
      (contrasenaBD) =>
        contrasenaBD.usuario === usuario &&
        contrasenaBD.contrasena === contrasena
    );

    if (Cencontradas.length > 0) {
      alert("Bienvenid@, " + usuario);
      navigate("/inicio"); // Redireccionando
    } else {
      setIntentos(intentos - 1);
      if (intentos === 1) {
        alert(
          "Sobrepasaste los 3 intentos permitidos. Intente de nuevo más tarde."
        );
        // Deshabilitar el botón de inicio de sesión
      } else {
        alert("contraseña inválida. Intentos restantes: " + (intentos - 1));
      }
    }
  };

  return (
    <div className="formu">
      <div className="formu__form">
        <div id="logoInicio">
          <img src="../images/5655237.png" alt="usuario" />
        </div>
        <br />
        <h2>Iniciar Sesion</h2>
        <form>
          <input type="text" placeholder="Usuario" id="Correo" />
          <i className="bi-envelope"></i>
          <div className="ojo">
            <span className="icon-eye" onClick={handleEyeIconClick}>
              <x
                className={
                  passwordVisible ? "bi-eye-fill" : "bi-eye-slash-fill"
                }
              ></x>
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              id="contrasena"
              name="pass"
              placeholder="Contraseña"
            />
            <i className="bi-lock-fill"></i>
          </div>
          <input className="check" type="checkbox" id="checkid" />
          <label htmlFor="checkid">Recordar Sesion</label>
          <Link to={"/registro"}>Olvidaste tu contraseña</Link>

          <button className="boton1" onClick={handleLogin}>
            Iniciar Sesion
          </button>
        </form>
        <p id="intentosRestantesP" className="">
          Intentos restantes: <span>{intentos}</span>
        </p>
        <div className="registro ">
          <Link to={"/registro"}>Desea Registrarse</Link>
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
  );
}

export default LoginForm;
