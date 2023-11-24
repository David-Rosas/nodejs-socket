// server.js
const http = require('http');
const { Server } = require('socket.io');
const { connectToDatabase } = require('./database/databaseConnection');
const { crearCuenta, crearPedido} = require('./controllers/controllerPedido');

const server = http.createServer();
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Escucha eventos desde Laravel
    socket.on('evento-laravel', async (data) => {
      console.log('Evento desde Laravel:', data);
      try {
        const nuevaCuenta = await crearCuenta(data.nombre, data.email, data.telefono);

        const nuevoPedido = await crearPedido(nuevaCuenta._id, data.producto, data.cantidad, data.valor);

        console.log('Cuenta y pedido creados con éxito:', nuevaCuenta, nuevoPedido);
    } catch (error) {
        console.error('Error al crear cuenta y pedido:', error);
    }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3000;

connectToDatabase()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });
