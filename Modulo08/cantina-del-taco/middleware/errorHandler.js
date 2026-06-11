module.exports = function(err, req, res, next) {
  console.error(err);

  // Erro de validação do Mongoose
  if (err.name === "ValidationError") {
    const mensagens = Object.values(err.errors).map(function(e) { return e.message; });
    return res.status(400).json({ erro: mensagens.join(", ") });
  }

  // ID em formato inválido
  if (err.name === "CastError") {
    return res.status(400).json({ erro: "ID inválido" });
  }

  // Email duplicado (índice unique)
  if (err.code === 11000) {
    return res.status(400).json({ erro: "Email já cadastrado" });
  }

  res.status(500).json({ erro: "Erro interno do servidor" });
};
