import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasks.controller.js'

const router = Router();

// router.get('/tasks', authRequired, (req, res) => res.send('tasks'));

router.get('/tasks', authRequired, getTasks); // obtener todo
router.get('/tasks/:id', authRequired, getTask); // obtener un solo elemento por el id
router.post('/tasks', authRequired, createTask);// Generar un nuevo elemento.
router.delete('/tasks/:id', authRequired, deleteTask); // Borrar un elemento por el id
router.put('/tasks/:id', authRequired, updateTask); // Actualizar un elemento por el id.

export default router;