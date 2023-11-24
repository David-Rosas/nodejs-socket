const mongoose = require('mongoose');

const esquemaCuenta = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: String,
});

const ModeloCuenta = mongoose.model('Cuenta', esquemaCuenta);

module.exports = ModeloCuenta;
