import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCitaGeneralSchema } from "../schemas/citaGeneral.schema.js";
import {
    getCitasGeneral,
    getCitasGeneralUsuario,
    getCitaGeneral,
    createCitaGeneral,
    updateCitaGeneral,
    deleteCitaGeneral
} from '../controllers/citaGeneral.controller.js'

const router = Router();

// router.get('/citasGeneral', authRequired, (req, res) => res.send('citasGeneral'));

router.get('/citasGeneral', authRequired, getCitasGeneral); // obtener todo sin usuario
router.get('/citasGeneral/user', authRequired, getCitasGeneralUsuario); // obtener todo lo de un solo usuario
router.get('/citasGeneral/:id', authRequired, getCitaGeneral); //!obtener un solo elemento por el id  ////EN ESTE CASO HAY QUE PONER EN LA URL ASI : http://localhost:4000/api/citasGeneral/6511f8abc67ece9144c2ea4b
router.post('/citasGeneral', authRequired, validateSchema(createCitaGeneralSchema), createCitaGeneral);// Generar un nuevo elemento. Aqui se genera la validacion de las tareas con validateSchema(createCitaGeneralSchema)
router.delete('/citasGeneral/:id', authRequired, deleteCitaGeneral); // Borrar un elemento por el id
router.put('/citasGeneral/:id', authRequired, updateCitaGeneral); // Actualizar un elemento por el id.

export default router;