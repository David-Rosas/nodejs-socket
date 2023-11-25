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
    credentials: false,
  })
);

wss.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('message', async (data) => {
    
    try {
      const dataString = data.toString('utf8');
  
      const parsedData = JSON.parse(dataString);
      console.log('Mensaje desde el cliente:', parsedData);
      // Procesar la información 
      if(parsedData.evento == "eventPedidos"){
      const nuevaCuenta = await crearCuenta(parsedData.pedido.cuenta.nombre, parsedData.pedido.cuenta.email, parsedData.pedido.cuenta.telefono);
      const nuevoPedido = await crearPedido(nuevaCuenta._id, parsedData.pedido.producto, parsedData.pedido.cantidad, parsedData.pedido.valor, parsedData.pedido.total);
      const responseData = { nuevaCuenta, nuevoPedido };

      // Enviar la respuesta de vuelta al cliente
      socket.send(JSON.stringify(responseData));
      console.log('Cuenta y pedido creados con éxito');
    }
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
