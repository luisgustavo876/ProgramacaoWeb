const Aluno = require('../models/Aluno');

exports.listar = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.curso) filtro.curso = req.query.curso;
    if (req.query.ativo) filtro.ativo = req.query.ativo;
    const alunos = await Aluno.find(filtro).sort({ nome: 1 });
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscar = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Nao encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ erro: 'Nao encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.remover = async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
