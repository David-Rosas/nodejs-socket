require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4001;
const router = express.Router();

// middlewares ===========================================
app.use(
  cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: process.env.URL_FRONTEND,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'))

// =======================================================

// Rutas ==================================================

const routerInit = router.get("/", function (req, res, next) {
  res.send("EPAM- Backend");
  res.end();
});

app.use(UserRoutes)
app.use(TaskRoutes)

app.use(cookieParser());
app.use(routerInit);

// ========================================================

app.listen(port, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});

module.exports = app;