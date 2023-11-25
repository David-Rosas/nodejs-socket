const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { connectToDatabase } = require('./database/databaseConnection');
const { crearCuenta, crearPedido } = require('./controllers/controllerPedido');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(
  cors({
    origin: process.env.URL_FRONTEND,
    credentials: true,
  })
);

wss.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('message', async (data) => {
    console.log('Mensaje desde el cliente:', data);
    try {
      // Procesar la información y emitir la respuesta a través del WebSocket
      const nuevaCuenta = await crearCuenta(data.nombre, data.email, data.telefono);
      const nuevoPedido = await crearPedido(nuevaCuenta._id, data.producto, data.cantidad, data.valor);
      const responseData = { nuevaCuenta, nuevoPedido };

      // Enviar la respuesta de vuelta al cliente
      socket.send(JSON.stringify(responseData));

      console.log('Cuenta y pedido creados con éxito:', nuevaCuenta, nuevoPedido);
    } catch (error) {
      console.error('Error al crear cuenta y pedido:', error);
    }
  });

  socket.on('close', () => {
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
