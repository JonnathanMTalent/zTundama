//¿en este archivo los console se ven en la terminal del visual usando la extencion morgan
import User from '../models/user.model.js';

export const register = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body; // aqui estamos recibiendo lo del request body que envia el usuario e igualamos el objeto para extraer las variables.
    // console.log(email, password, username);

    try { // en este objeto User hacemos el registro en la base de datos de  mongo haciendo uso del esquema user.model
        const newUser = new User({
            username,
            email,
            password
        });
        // console.log(newUser);
        // res.send("Registrando...");
        const userSaved = await newUser.save(); // aqui se registra en la base de datos de mongo el nuevo usuario
        res.json(userSaved); // aqui se envia como respuesta al frontend
    } catch (error) {
        console.log(error);
    }

};

export const login = (req, res) => {
    console.log(req.body);
    res.send("Registrando...");
}

// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { TOKEN_SECRET } from "../config.js";
// import { createAccessToken } from "../libs/jwt.js";

// export const register = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         const userFound = await User.findOne({ email });

//         if (userFound)
//             return res.status(400).json({
//                 message: ["The email is already in use"],
//             });

//         // hashing the password
//         const passwordHash = await bcrypt.hash(password, 10);

//         // creating the user
//         const newUser = new User({
//             username,
//             email,
//             password: passwordHash,
//         });

//         // saving the user in the database
//         const userSaved = await newUser.save();

//         // create access token
//         const token = await createAccessToken({
//             id: userSaved._id,
//         });

//         res.cookie("token", token, {
//             httpOnly: process.env.NODE_ENV !== "development",
//             secure: true,
//             sameSite: "none",
//         });

//         res.json({
//             id: userSaved._id,
//             username: userSaved.username,
//             email: userSaved.email,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const userFound = await User.findOne({ email });

//         if (!userFound)
//             return res.status(400).json({
//                 message: ["The email does not exist"],
//             });

//         const isMatch = await bcrypt.compare(password, userFound.password);
//         if (!isMatch) {
//             return res.status(400).json({
//                 message: ["The password is incorrect"],
//             });
//         }

//         const token = await createAccessToken({
//             id: userFound._id,
//             username: userFound.username,
//         });

//         res.cookie("token", token, {
//             httpOnly: process.env.NODE_ENV !== "development",
//             secure: true,
//             sameSite: "none",
//         });

//         res.json({
//             id: userFound._id,
//             username: userFound.username,
//             email: userFound.email,
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const verifyToken = async (req, res) => {
//     const { token } = req.cookies;
//     if (!token) return res.send(false);

//     jwt.verify(token, TOKEN_SECRET, async (error, user) => {
//         if (error) return res.sendStatus(401);

//         const userFound = await User.findById(user.id);
//         if (!userFound) return res.sendStatus(401);

//         return res.json({
//             id: userFound._id,
//             username: userFound.username,
//             email: userFound.email,
//         });
//     });
// };

// export const logout = async (req, res) => {
//     res.cookie("token", "", {
//         httpOnly: true,
//         secure: true,
//         expires: new Date(0),
//     });
//     return res.sendStatus(200);
// };