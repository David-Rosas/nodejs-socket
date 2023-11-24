const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const usuario = "tu_usuario";
    const contraseña = "tu_contraseña";
    const clusterURL = "cluster_URL";
    const nombreBaseDeDatos = "tu_base_de_datos";

    await mongoose.connect(
      `mongodb+srv://${usuario}:${contraseña}@${clusterURL}/${nombreBaseDeDatos}?retryWrites=true&w=majority`,
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
