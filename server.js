require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/**
 * CONEXÃO COM O BANCO MONGODB
 */
require("./dataBase/conn");

/**
 * MIDDLEWARES
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ROUTES
 */
app.use("/api/vaga", require("./routes/vagaRoute"));
app.use("/api/candidato", require("./routes/candidatoRoute"));

/**
 * RODA O SERVIDOR DA APLICAÇÃO
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.log(`Could not listen on port ${PORT}`);
  console.log(`Server listening on port ${PORT}`);
});
