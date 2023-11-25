require("dotenv").config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { connectToDatabase } = require('./database/databaseConnection');
const PedidoController = require('./controllers/PedidoController');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(
  cors({
    origin: process.env.URL_FRONTEND,
    credentials: false,
  })
);

  wss.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('message', (data) => {
        PedidoController.procesarEventoPedido(socket, data);
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
