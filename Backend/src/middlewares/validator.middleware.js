

// la variable schema que recibe es del archivo auth.schema.js o task.schema osea registerSchema o loginSchema o createTaskSchema y se puede seguir generando nuevos esquemas de validacion usando este middleware como intermediario.

export const validateSchema = (schema) => (req, res, next) => {
    try { // si no usamos try catch en cada error se tumbaria el servidor
        schema.parse(req.body); // el esquema va a ser comparado con el req.body que es lo que llega del front
        next();
    } catch (error) {
        // console.log(error.errors);
        // return res.status(400).json({ error });
        return res
            .status(400)
            .json({ message: error.errors.map((error) => error.message) });
        // .json(error.errors.map((error) => error.message));
    }
};