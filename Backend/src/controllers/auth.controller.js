//¿en este archivo los console se ven en la terminal del visual usando la extencion morgan
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'; // modulo para encryptar la contraseña del usuario.
// import jwt from 'jsonwebtoken'; // genera un string que permite validar si ya habia habido autenticacion aqui usamos el modulo json webtoken 
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body; // aqui estamos recibiendo lo del request body que envia el usuario e igualamos el objeto para extraer las variables.
    // console.log(email, password, username); 1) entra el json del request body

    try {
        const passwordHash = await bcrypt.hash(password, 10); // esto encripta el password ejecutando el comando 10 veces  2) se encripta el hash

        const newUser = new User({// en este objeto User hacemos el registro en la base de datos de  mongo haciendo uso del esquema user.model 3)se genera un nuevo usuario en bd
            username,
            email,
            password: passwordHash
        });
        // console.log(newUser);
        // res.send("Registrando...");
        const userSaved = await newUser.save(); // aqui se registra en la base de datos de mongo el nuevo usuario 4) se guarda el usuario

        // res.json(userSaved); // aqui se envia toda la info del usuario, inclusive la contraseña, como respuesta al frontend
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token); // es un metodo de express para establecer una cookie dentro, se le llama 'token' y obtiene el valor de token que se genero en jwt.

        // res.json({
        //     message: "Usuario creado Satisfactoriamente."
        // })

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: error.message
        });
    }

};

export const login = (req, res) => {
    console.log(req.body);
    res.send("Registrando...");
}
