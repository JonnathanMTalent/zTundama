import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCitaSchema } from "../schemas/cita.schema.js";
import {
    getCitas,
    getCita,
    createCita,
    updateCita,
    deleteCita
} from '../controllers/citas.controller.js'

const router = Router();

// router.get('/citas', authRequired, (req, res) => res.send('citas'));

router.get('/citas', authRequired, getCitas); // obtener todo
router.get('/citas/:id', authRequired, getCita); //!obtener un solo elemento por el id  ////EN ESTE CASO HAY QUE PONER EN LA URL ASI : http://localhost:4000/api/citas/6511f8abc67ece9144c2ea4b
router.post('/citas', authRequired, validateSchema(createCitaSchema), createCita);// Generar un nuevo elemento. Aqui se genera la validacion de las tareas con validateSchema(createCitaSchema)
router.delete('/citas/:id', authRequired, deleteCita); // Borrar un elemento por el id
router.put('/citas/:id', authRequired, updateCita); // Actualizar un elemento por el id.

export default router;