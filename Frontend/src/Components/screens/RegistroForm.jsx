import React, { useState } from "react";
import "../styles/registro.css";
import { useNavigate } from "react-router-dom"; // Importa useHistory para la redirección
function RegistroForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const handleEyeIconClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Simulando validación y almacenamiento de datos
    const guardar = Array.from(formData.values()).every(
      (value) => value !== ""
    );
    if (guardar) {
      const objDatosRegistro = Object.fromEntries(formData.entries());
      objDatosRegistro.citas = [];
      console.log(objDatosRegistro);
      alert(`Datos ingresados correctamente:
        Nombre: ${objDatosRegistro.nombres}
        Apellidos: ${objDatosRegistro.apellidos}
        Cédula:${objDatosRegistro.cedula}
        Fecha: ${objDatosRegistro.fecha}
        Correo: ${objDatosRegistro.correo}
        Celular:${objDatosRegistro.celular}
        Usuario:${objDatosRegistro.usuario}
        citas:${objDatosRegistro.citas};
        `);
      // Convertir el objeto a JSON y guardar en el almacenamiento local
      localStorage.setItem("DatosRegistro", JSON.stringify(objDatosRegistro));
      // Redirigir a LoginbiForm después de guardar los datos
      navigate("/login"); // Cambia '/login'
    } else {
      alert("No puede haber campos vacíos");
    }
  };

  return (
    <body>
      <form onSubmit={handleSubmit} action="../html/login.html" id="form1">
        {/* <form id="form1"> */}
        <div className="login-box">
          <h1>Datos Del paciente</h1>
          <br />
          <div className="panel-izquierdo">
            <label>Nombres </label>
            <input
              type="text"
              placeholder="Ingrese su Nombre"
              id="nombres"
              name="nombres"
            />

            <label>Fecha</label>
            <input
              type="date"
              name="fecha"
              min="2021-09-13"
              max="2022-09-13"
              id="fecha"
            />
            <label>Cedula</label>
            <input
              type="text"
              placeholder="ingrese su numero de Cedula"
              id="cedula"
              name="cedula"
            />
            <label>Usuario</label>
            <input
              type="text"
              placeholder="ingrese su usuario de acceso"
              id="usuario"
              name="usuario"
            />
          </div>
          <div className="panel-derecho">
            <label>Apellidos</label>
            <input
              type="text"
              placeholder="ingrese sus Apellidos"
              id="apellidos"
              name="apellidos"
            />
            <label>Celular</label>
            <input
              type="text"
              placeholder="Ingrese Celular"
              id="celular"
              name="celular"
            />
            <label>Correo Electronico</label>
            <input
              type="text"
              placeholder="ingrese su correo Electronico"
              id="correo"
              name="correo"
            />
            {/* ¿Aqui empieza el eye icon */}
            <label>Contraseña</label>
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
                name="contrasena"
                placeholder="Contraseña"
              />
            </div>
            {/* ¿Aqui termina el eye icon */}
          </div>
          <input type="submit" value="Continuar" />
          <input
            type="button"
            className="volver"
            value="Volver"
            onClick={() => window.history.back()}
          />
          <br />
          <br />
        </div>
      </form>
      {/* <script src="../js/registro.js"></script> */}
    </body>
  );
}

export default RegistroForm;
