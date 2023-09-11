import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
////por definicion el middleware tiene que tener estos 3 attributos. El next sirve para que antes de retornar algo continue a la funcion siguiente en la que esta sirviendo de mediador.

// en este caso el middleware actua validando si hay un token  o no lo hay y segun sea continua al next o finaliza el mismo la operacion
export const authRequired = (req, res, next) => {
    // console.log('validando el token');
    // console.log(req.headers); // con esto validamos que en los headers venga el cookie cuando ya se ha autentivado o logueado el usuario en una peticion get ya vienen los headers
    // const token = req.headers.cookie; // esta es una forma pero hay que organizar luego la info
    // console.log(token);
    // const cookies = req.cookies;
    // console.log(cookies);  // en las cookies viene un token
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No hay token, autorizacion denegada." });
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token invalido." })
        req.user = user ////De la peticion del token guardamos un req.user, el cual va a ser igual a user de la funcion el que se esta decodificando.Esto para que todas las otras rutas de auth.controller lo puedan acceder en req.user
        // console.log(user);
        next(); // esto hace pasar a la siuiente funcion que este en el archivo donde se importo esta fncion, en este caso profile.
    });
    // next(); // esto hace pasar a la siuiente funcion que este en el archivo donde se importo esta fncion, en este caso profile.
}