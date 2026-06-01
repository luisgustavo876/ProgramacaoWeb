const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registrar = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ erro: 'Credenciais invalidas' });
    }
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).select('-senha');
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
