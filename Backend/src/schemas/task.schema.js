import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "La descripcion es requerida",
    }), // al poner .optional() es que no es obligatorio poner el dato
    date: z.string().datetime().optional(), // datetime valida que si sea una fecha.
});

