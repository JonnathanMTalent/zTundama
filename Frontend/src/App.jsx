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
import CuentaUsuario from "./Components/screens/CuentaUsuario";
import Inicio from "./Components/screens/inicio";
import EditarCitas from "./Components/screens/EditarCitas";
import ContactForm from "./Components/crud/ContactForm.jsx";
import TaskFormPage from "./Components/screens/TaskFormPage.jsx";
import TasksPage from "./Components/screens/TasksPage.jsx";

import CrudApi from "./Components/crud/CrudApi";
import { TaskProvider } from "./Components/context/TasksContext.jsx";
import { CitaProvider } from "./Components/context/CitasContext.jsx";

// el AuthProvider es el contexto.
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <TaskProvider>
          <CitaProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/registro" element={<RegistroForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/acercade" element={<Acercade />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/contactForm" element={<ContactForm />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/agendaCitas" element={<AgendaCitas />} />
                  <Route path="/generarCitas" element={<GenerarCitas />} />
                  <Route path="/cuentaUsuario" element={<CuentaUsuario />} />
                  <Route path="/inicio" element={<Inicio />} />
                  <Route path="/editarCitas" element={<EditarCitas />} />
                  <Route path="/crudApi" element={<CrudApi />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<h1>Profile</h1>} />
                </Route>
              </Routes>
            </Router>
          </CitaProvider>
        </TaskProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
