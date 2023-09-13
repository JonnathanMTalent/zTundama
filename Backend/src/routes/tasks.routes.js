import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
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
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);// Generar un nuevo elemento. Aqui se genera la validacion de las tareas con validateSchema(createTaskSchema)
router.delete('/tasks/:id', authRequired, deleteTask); // Borrar un elemento por el id
router.put('/tasks/:id', authRequired, updateTask); // Actualizar un elemento por el id.

export default router;