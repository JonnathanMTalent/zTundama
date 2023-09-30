import axios from './axios.js'

export const getCitasRequest = () => axios.get('/citas');  // para obtener todas las tareas.

export const getCitaRequest = (id) => axios.get(`/citas/${id}`); // para obtener una sola tarea identificada con su id.

export const createCitaRequest = (cita) => axios.post('/citas', cita);

// export const updateCitasRequest = (cita) => axios.put(`/citas/${cita._id}`, cita);
export const updateCitasRequest = (id, cita) => axios.put(`/citas/${id}`, cita);

export const deleteCitasRequest = (id) => axios.delete(`/citas/${id}`);