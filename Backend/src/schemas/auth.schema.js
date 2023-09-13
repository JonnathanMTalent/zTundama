import { z } from 'zod'; // este z nos permite entregar los tipos de datos
// https://zod.dev/


// como el req.body es un objeto usamos z.object

// validacion del registro:
export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }).min(5, 'el usuario tiene que tener minimo 5 caracteres'), // aqui podemos usar otras validaciones como max, min , etc.
    email: z.string({
        required_error: 'El Email es requerido'
    }).email({
        message: "Email is not valid",
    }),
    password: z.string({
        required_error: 'La clave de usuario es requerida'
    }).min(6, 'La clave tiene que tener mínimo 6 carácteres.')
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El Email es requerido'
    }),
    password: z.string({
        required_error: 'La clave de usuario es requerida'
    }).min(6, 'La clave tiene que tener mínimo 6 carácteres.')
});
// export const loginSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6),
// });