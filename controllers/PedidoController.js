const { crearCuenta, crearPedido } = require('../services/pedidoService');

async function procesarEventoPedido(socket, data) {
    try {
        const dataString = data.toString('utf8');
        const parsedData = JSON.parse(dataString);
        console.log('Mensaje desde el cliente:', parsedData);

        if (parsedData.evento === 'eventPedidos') {
            const nuevaCuenta = await crearCuenta(
                parsedData.pedido.cuenta.nombre,
                parsedData.pedido.cuenta.email,
                parsedData.pedido.cuenta.telefono
            );

            const nuevoPedido = await crearPedido(
                nuevaCuenta._id,
                parsedData.pedido.producto,
                parsedData.pedido.cantidad,
                parsedData.pedido.valor,
                parsedData.pedido.total
            );

            const responseData = { nuevaCuenta, nuevoPedido };

            // Enviar la respuesta de vuelta al cliente
            socket.send(JSON.stringify(responseData));
            console.log('Cuenta y pedido creados con éxito');
        }
    } catch (error) {
        console.error('Error al procesar cuenta y pedido:', error);
    }
}

module.exports = {
    procesarEventoPedido,
};