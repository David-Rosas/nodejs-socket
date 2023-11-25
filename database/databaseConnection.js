const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    console.log("Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
    throw error;
  }
};

module.exports = { connectToDatabase };
