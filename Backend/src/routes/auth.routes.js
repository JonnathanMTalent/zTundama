import { Router } from "express";
import {
    login,
    logout,
    register
    // verifyToken,
} from "../controllers/auth.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

// router.post("/api/register", register); // esta es una de las formas de modificar las rutas
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// router.post("/register", validateSchema(registerSchema), register);
// router.post("/login", validateSchema(loginSchema), login);
// router.get("/verify", verifyToken);
// router.post("/logout", verifyToken, logout);

export default router;