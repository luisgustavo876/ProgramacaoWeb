const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nome:  { type: String, required: [true, "Nome obrigatório"], trim: true },
  email: { type: String, required: [true, "Email obrigatório"], unique: true, lowercase: true, trim: true },
  senha: { type: String, required: [true, "Senha obrigatória"], minlength: [6, "Senha deve ter no mínimo 6 caracteres"] }
}, { timestamps: true });

// Criptografa a senha antes de salvar
usuarioSchema.pre("save", async function() {
  if (!this.isModified("senha")) return;
  this.senha = await bcrypt.hash(this.senha, 10);
});

module.exports = mongoose.model("Usuario", usuarioSchema);
