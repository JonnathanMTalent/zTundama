import React, { useState } from "react";
import "../styles/registro.css";
// import { registerRequest } from "../../api/auth";  // se usa en AuthContext.jsx
import { useNavigate } from "react-router-dom"; // Importa useHistory para la redirección
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import Message from "../crud/Message";

function RegistroForm() {
  const { signup, user, isAuthenticated, errors: RegisterErrors } = useAuth(); // errors fue renombrado con : para evitar conflictos en otras secciones.
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const handleEyeIconClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  console.log(user);

  useEffect(() => {
    // redirige si el usuario ya esta auntenticado.
    if (isAuthenticated) navigate("/inicio");
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
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
      //   console.log(objDatosRegistro);
      alert(`Datos ingresados correctamente:
        Nombre: ${objDatosRegistro.nombres}
        Apellidos: ${objDatosRegistro.apellidos}
        Cédula:${objDatosRegistro.cedula}
        Fecha: ${objDatosRegistro.fecha}
        Correo: ${objDatosRegistro.email}
        Celular:${objDatosRegistro.celular}
        Usuario:${objDatosRegistro.username}
        citas:${objDatosRegistro.citas};
        `);
      // Convertir el objeto a JSON y guardar en el almacenamiento local
      localStorage.setItem("DatosRegistro", JSON.stringify(objDatosRegistro));
      // Redirigir a LoginbiForm después de guardar los datos
      //   const res = await registerRequest(objDatosRegistro); // se ejcuta en AuthContext.jsx
      //   if (res) {
      //     // console.log("esto es el res", res);
      //     navigate("/login"); // Cambia '/login'
      //   }
      signup(objDatosRegistro); // aqui estamos haciendo el proceso de registro de usuario usando AuthContext.jsx
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
          {RegisterErrors.map((error, i) => (
            <Message msg={error} bgColor="red" key={i}></Message>
          ))}
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
              name="username"
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
              name="email"
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
                name="password"
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
