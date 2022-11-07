import express from 'express';
import userRoutes from './routes/userRoutes.js'
 
const api = express();
api.use(express.json())


api.get('/status', (_, res) => {
 res.json({
   msg: 'API En linea funcionado',
 });
});

 //Registro de rutas
 api.use(userRoutes);


export default api;