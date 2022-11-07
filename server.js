import http from 'http';
import api from './api/api.js';
import config from './api/config/index.js'
import database from './api/config/database.js';

const server = http.createServer(api);
 
server.on('error', (error) => {// server.on es cuando pase algo, la prmer variable ¿cuando pase que?, la segunda un callback de que hacer en caso de que pase
 if (error.code === 'EADDRINUSE') {
   console.log('Ese puerto ya está siendo usado por otra aplicación');
 }
 console.error('Error al iniciar servidor 🔴');
});
 
server.on('listening', () => {
 console.log('Servidor escuchando 🟢')
});
 
server.listen(config.server.port);

database();// aqui se hace la conseccion a la db
