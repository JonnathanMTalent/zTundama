
//  usamos esta funcion para ejecutar varias veces
import { TOKEN_SECRET } from '../config.js'
import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            // { id: userSaved._id }, // aqui estamos guardanto en un token el id (codigo anterior)
            payload,
            // "secret123", // aqui se pone la clave
            TOKEN_SECRET,
            {
                expiresIn: "1d"  // tiempo de expiracion del token
            },
            (err, token) => {  // con esta callback se ejecuta esto de forma asincrona
                // if (err) console.log(err);
                // res.json({ token }); // valida si se genero el token y lo envia como respuesta al front
                if (err) reject(err); // este es el reject de la promesa, donde se da esta respuesta si salio mal el procedimiento
                resolve(token); // este es el resolve de la promesa donde se da esta respuesta si salio bien el procedimiento
            }
        );
    });

}
