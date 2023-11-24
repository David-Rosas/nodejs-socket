const mongoose = require('mongoose');

const esquemaPedido = new mongoose.Schema({
    cuenta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true,
    },
    producto: String,
    cantidad: Number,
    valor: Number,
    total: Number,
});

const ModeloPedido = mongoose.model('Pedido', esquemaPedido);

module.exports = ModeloPedido;
