import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Index from "../src/Components/screens/Index.jsx";
import LoginForm from "./Components/screens/LoginForm.jsx";
import RegistroForm from "./Components/screens/RegistroForm";
import Acercade from "./Components/screens/Acercade";
import Servicios from "./Components/screens/Servicios";
import AgendaCitas from "./Components/screens/AgendaCitas";
import CuentaUsuario from "./Components/screens/CuentaUsuario";
import Inicio from "./Components/screens/inicio";
import EditarCitas from "./Components/screens/EditarCitas";
import ContactForm from "./Components/crud/ContactForm.jsx";

import CrudApi from "./Components/crud/CrudApi";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <Ensayo></Ensayo> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registro" element={<RegistroForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/acercade" element={<Acercade />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/agendaCitas" element={<AgendaCitas />} />
          <Route path="/cuentaUsuario" element={<CuentaUsuario />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/editarCitas" element={<EditarCitas />} />

          <Route path="/contactForm" element={<ContactForm />} />
          <Route path="/crudApi" element={<CrudApi />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
