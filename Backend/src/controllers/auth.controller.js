//¿en este archivo los console se ven en la terminal del visual usando la extencion morgan
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'; // modulo para encryptar la contraseña del usuario.
import jwt from 'jsonwebtoken'; // genera un string que permite validar si ya habia habido autenticacion aqui usamos el modulo json webtoken 
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    // console.log(req.body);
    const { apellidos, cedula, celular, citas, email, fecha, nombres, password, username } = req.body; // aqui estamos recibiendo lo del request body que envia el usuario e igualamos el objeto para extraer las variables.
    // console.log(email, password, username); 1) entra el json del request body

    try {

        const userFound = await User.findOne({ email }); // con esta linea buscamos en la base de datos si ya existia ese correo registrado
        // if(userFound)return res.status(400).json({message:"El correo ya estaba registrado."})
        if (userFound) return res.status(400).json({ message: ["El correo ya estaba registrado."] });
        // if (userFound) return res.status(400).json(["El correo ya estaba registrado."]);

        const passwordHash = await bcrypt.hash(password, 10); // esto encripta el password ejecutando el comando 10 veces  2) se encripta el hash

        const newUser = new User({// en este objeto User hacemos el registro en la base de datos de  mongo haciendo uso del esquema user.model 3)se genera un nuevo usuario en bd
            apellidos,
            cedula,
            celular,
            citas,
            email,
            fecha,
            nombres,
            password: passwordHash,
            username
        });
        // console.log(newUser);
        // res.send("Registrando...");
        const userSaved = await newUser.save(); // aqui se registra en la base de datos de mongo el nuevo usuario 4) se guarda el usuario

        // res.json(userSaved); // aqui se envia toda la info del usuario, inclusive la contraseña, como respuesta al frontend
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token); // es un metodo de express para establecer una cookie dentro, se le llama 'token' y obtiene el valor de token que se genero en createAccesToken con jsonwebtoken jwt.

        // res.json({
        //     message: "Usuario creado Satisfactoriamente."
        // })

        res.json({
            id: userSaved._id,
            apellidos: userSaved.apellidos,
            cedula: userSaved.cedula,
            celular: userSaved.celular,
            citas: userSaved.citas,
            email: userSaved.email,
            fecha: userSaved.fecha,
            nombres: userSaved.nombres,
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

export const login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body; // aqui estamos recibiendo lo del request body que envia el usuario e igualamos el objeto para extraer las variables.
    // console.log(email, password, username); 1) entra el json del request body

    try {
        const userFound = await User.findOne({ email }) // busca en la bd de mongo si existe ya el usuario con ese email.
        if (!userFound) return res.status(400).json({ message: ["Usuario no encontrado"] });

        const isMatch = await bcrypt.compare(password, userFound.password); // compara el usuario pasword puesto en el form con el usuario password de la bd

        if (!isMatch) return res.status(400).json({ message: ["Incorrect password"] });

        const token = await createAccessToken({ id: userFound._id });

        // es un metodo de express para establecer una cookie dentro, se le llama 'token' y obtiene el valor de token que se genero en createAccesToken de jsonwebtoken.
        res.cookie('token', token);

        //¿Estas lineas se ponene para que en el navegador salga informacion sobre la cookie.
        // res.cookie('token', token, {
        //     sameSite: 'none', // indica que la cookie no esta en el mismo dominio, porque estamos usando diferentes puertos para el back y el front
        //     secure: 'true',  // esta propiedad va unida
        //     httpOnly: false  // en false nos permite ver la cookie en el panel Aplication del navegador.
        // });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: error.message
        });
    }

};

export const logout = (req, res) => { // aqui estamos cambiando el tiempo de validez del token de autenticacion, por eso desloguea al usuario
    res.cookie('token', '',
        {
            expires: new Date(0)
        })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    // console.log(req.user); // este req.user fue el que guardamos en validateToken.js
    const userFound = await User.findById(req.user.id); // este comando busca en la base de datos de mongo el usuario por su id y retorna todos los datos.
    // es necesario poner el await para que espere a que traiga los datos del usuario antes de continuar

    if (!userFound) return res.status(400).json({ message: ["Usuario no encontrado en la base de datos de mongo"] });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
    // res.send('profile');
}// aqui se pueden extender los datos haciendo mas consultas incluso a mas backend


export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "No esta autorizado. No hay token" }); // Esto indicaria que no habia token

    jwt.verify(token, TOKEN_SECRET, async (err, user) => { // esto verifica el token. // la llamada retorna una funcion callback que es el tercer parametro, en esta se maneja la respuesta o el error.
        if (err) return res.status(401).json({ message: "No esta autorizado, error al validar el token" });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "No está autorizado, el token no corresponde a algun usuario" }); // existe un token pero no es un token valido.

        return res.json({ // si paso por todas la validaciones anteriores entonces si existe un usuario y el token.
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}