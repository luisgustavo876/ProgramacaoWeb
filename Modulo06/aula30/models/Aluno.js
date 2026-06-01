const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  curso: { type: String, default: 'Programacao Web' }
}, { timestamps: true });

module.exports = mongoose.model('Aluno', alunoSchema);
