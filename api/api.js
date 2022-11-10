import express from 'express';
import userRoutes from './routes/userRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import messageRoutes from './routes/messageRoutes.js'




const api = express();


api.use(express.json())


api.get('/status', (_, res) => {
 res.json({
   msg: 'API En linea funcionado',
 });
});

 //Registro de rutas
 api.use(userRoutes);
 api.use(propertyRoutes)
 api.use(messageRoutes)


export default api;