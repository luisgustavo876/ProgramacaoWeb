const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.registrar = async function(req, res, next) {
  try {
    const { nome, email, senha } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ erro: "Email já cadastrado" });

    const usuario = await Usuario.create({ nome, email, senha });

    // Nunca retornar a senha na resposta
    res.status(201).json({
      mensagem: "Usuário criado!",
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email
    });
  } catch (err) { next(err); }
};

exports.login = async function(req, res, next) {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ erro: "Email ou senha inválidos" });

    const ok = await bcrypt.compare(senha, usuario.senha);
    if (!ok) return res.status(401).json({ erro: "Email ou senha inválidos" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, nome: usuario.nome });
  } catch (err) { next(err); }
};
