const ModeloCuenta = require('../models/Cuenta');
const ModeloPedido = require('../models/Pedido');

const crearCuenta = async (nombre, email, telefono) => {
    let cuentaExistente = await ModeloCuenta.findOne({ email });

    if (!cuentaExistente) {
        cuentaExistente = new ModeloCuenta({ nombre, email, telefono });
        await cuentaExistente.save();
    }

    return cuentaExistente;
};


const crearPedido = async (cuenta_id, producto, cantidad, valor, total) => {
    const nuevoPedido = new ModeloPedido({ cuenta_id, producto, cantidad, valor, total});
    await nuevoPedido.save();
    return nuevoPedido;
};

module.exports = { crearCuenta, crearPedido };