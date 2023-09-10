import app from './app.js' // en app.js estamos ejecutando express que es el servidor
import { connectDB } from "./db.js";


connectDB(); // se ejecuta la conexion a la base de datos.
app.listen(4000);
console.log('Server on port ', 4000);
