const mongoose = require("mongoose");

const pratoSchema = new mongoose.Schema({
  nome:      { type: String, required: [true, "Nome obrigatório"], trim: true },
  descricao: { type: String, default: "" },
  preco:     { type: Number, required: [true, "Preço obrigatório"], min: [0, "Preço não pode ser negativo"] },
  categoria: { type: String, required: [true, "Categoria obrigatória"],
    enum: {
      values: ["Tacos", "Burritos", "Quesadillas", "Nachos", "Bebidas", "Sobremesas"],
      message: "Categoria inválida"
    }
  },
  imagem:     { type: String, default: "" }, // URL da foto do prato
  picante:    { type: Number, default: 0, min: 0, max: 3 }, // 0 = suave, 3 = muito picante
  disponivel: { type: Boolean, default: true },
  criadoPor:  { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
}, { timestamps: true });

module.exports = mongoose.model("Prato", pratoSchema);
