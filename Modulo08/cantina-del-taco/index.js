require("dotenv").config();
const express      = require("express");
const mongoose     = require("mongoose");
const cors         = require("cors");
const path         = require("path");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Front-end (arquivos estáticos)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api/auth",   require("./routes/authRoutes"));
app.use("/api/pratos", require("./routes/pratoRoutes"));

// Error handler (sempre por último)
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(function() {
    console.log("✅ MongoDB conectado");
    app.listen(process.env.PORT || 3000, function() {
      console.log("🚀 Servidor rodando em http://localhost:" + (process.env.PORT || 3000));
    });
  })
  .catch(function(err) {
    console.error("❌ Erro ao conectar no MongoDB:", err.message);
  });
