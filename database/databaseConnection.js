const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const usuario = "admin";
    const contraseña = "6vkWvetHirjSblmh";
    const clusterURL = "cluster0.od5p6bh.mongodb.net";
    const nombreBaseDeDatos = "pedidos";
const uri = `mongodb+srv://${usuario}:${contraseña}@${clusterURL}/${nombreBaseDeDatos}?retryWrites=true&w=majority`;
    await mongoose.connect(uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    throw error;
  }
};

module.exports = { connectToDatabase };
