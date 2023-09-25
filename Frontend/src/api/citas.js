import axios from './axios.js'

export const getCitasRequest = () => axios.get('/Citas');  // para obtener todas las tareas.

export const getCitaRequest = (id) => axios.get(`/Citas/${id}`); // para obtener una sola tarea identificada con su id.

export const createCitasRequest = (Cita) => axios.post('/Citas', Cita);

export const updateCitasRequest = (Cita) => axios.put(`/Citas/${Cita._id}`, Cita);

export const deleteCitasRequest = (id) => axios.delete(`/Citas/${id}`);