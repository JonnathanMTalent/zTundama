import express, { application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';


const app = express(); // es basicamente el servidor
// app.listen(3000); esto se provo y se paso para index
// console.log('on port ', 3000);
app.use(morgan('dev')); // la aplicacion app usa el modulo morgan en su configuracion dev.sirve para ver la info en consola del terminal.
app.use(express.json()); // es para que se puedan convertir los request body en formato json
app.use(cookieParser());

app.use("/api", authRoutes);// asi se modifica la url// app.use(authRoutes); asi cuando api se pone desde auth.routes.js
app.use("/api", taskRoutes);


export default app;