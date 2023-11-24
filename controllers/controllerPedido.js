const ModeloCuenta = require('../models/Cuenta');
const ModeloPedido = require('../models/Pedido');

const crearCuenta = async (nombre, email, telefono) => {
    const nuevaCuenta = new ModeloCuenta({ nombre, email, telefono });
    await nuevaCuenta.save();
    return nuevaCuenta;
};

const crearPedido = async (cuenta_id, producto, cantidad, valor, total) => {
    const nuevoPedido = new ModeloPedido({ cuenta_id, producto, cantidad, valor, total});
    await nuevoPedido.save();
    return nuevoPedido;
};

module.exports = { crearCuenta, crearPedido };
