// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Components/context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Index from "../src/Components/screens/Index.jsx";
import LoginForm from "./Components/screens/LoginForm.jsx";
import RegistroForm from "./Components/screens/RegistroForm";
import Acercade from "./Components/screens/Acercade";
import Servicios from "./Components/screens/Servicios";
import AgendaCitas from "./Components/screens/AgendaCitas";
import GenerarCitas from "./Components/screens/GenerarCitas";
import GenerarCitasGeneral from "./Components/screens/GenerarCitasGeneral.jsx";
import CuentaUsuario from "./Components/screens/CuentaUsuario";
import Inicio from "./Components/screens/inicio";
import EditarCitas from "./Components/screens/EditarCitas";
import ContactForm from "./Components/crud/ContactForm.jsx";
import TaskFormPage from "./Components/screens/TaskFormPage.jsx";
import TasksPage from "./Components/screens/TasksPage.jsx";
import Citas from "./Components/screens/Citas.jsx";
import CitasGeneral from "./Components/screens/CitasGeneral.jsx";
import CitasGeneralUser from "./Components/screens/CitasGeneralUser.jsx";

import CrudApi from "./Components/crud/CrudApi";
import { TaskProvider } from "./Components/context/TasksContext.jsx";
import { CitaProvider } from "./Components/context/CitasContext.jsx";
import { CitaGeneralProvider } from "./Components/context/CitasGeneralContext.jsx";
// import NavbarBootstrap from "./Components/NavbarBootstrap.jsx";
import Navbar from "./Components/Navbar.jsx";

// el AuthProvider es el contexto.
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <TaskProvider>
          <CitaProvider>
            <CitaGeneralProvider>
              <Router>
                <main className="container">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/registro" element={<RegistroForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/acercade" element={<Acercade />} />
                    <Route path="/servicios" element={<Servicios />} />
                    <Route path="/contactForm" element={<ContactForm />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/agendaCitas" element={<AgendaCitas />} />
                      <Route path="/citas" element={<Citas />} />
                      <Route path="/citas/:id" element={<GenerarCitas />} />
                      <Route path="/generarCitas" element={<GenerarCitas />} />
                      <Route path="/citasGeneral" element={<CitasGeneral />} />
                      <Route
                        path="/citasGeneralUser"
                        element={<CitasGeneralUser />}
                      />
                      <Route
                        path="/citasGeneral/:id"
                        element={<GenerarCitasGeneral />}
                      />
                      <Route
                        path="/generarCitasGeneral"
                        element={<GenerarCitasGeneral />}
                      />
                      <Route
                        path="/cuentaUsuario"
                        element={<CuentaUsuario />}
                      />
                      <Route path="/inicio" element={<Inicio />} />
                      <Route path="/editarCitas" element={<EditarCitas />} />
                      <Route path="/crudApi" element={<CrudApi />} />
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/add-task" element={<TaskFormPage />} />
                      <Route path="/tasks/:id" element={<TaskFormPage />} />
                      <Route path="/profile" element={<h1>Profile</h1>} />
                    </Route>
                  </Routes>
                </main>
              </Router>
            </CitaGeneralProvider>
          </CitaProvider>
        </TaskProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
