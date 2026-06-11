const Prato = require("../models/Prato");

// GET /api/pratos — público (cardápio)
exports.listar = async function(req, res, next) {
  try {
    const { categoria, busca, ordem } = req.query;
    const filtro = { disponivel: true };
    if (categoria) filtro.categoria = categoria;
    if (busca) filtro.nome = { $regex: busca, $options: "i" };

    const pratos = await Prato.find(filtro)
      .sort(ordem === "preco" ? { preco: 1 } : { categoria: 1, nome: 1 });

    res.json(pratos);
  } catch (err) { next(err); }
};

// GET /api/pratos/admin — protegido (inclui indisponíveis, para o painel)
exports.listarTodos = async function(req, res, next) {
  try {
    const pratos = await Prato.find().sort({ categoria: 1, nome: 1 });
    res.json(pratos);
  } catch (err) { next(err); }
};

// GET /api/pratos/:id — público
exports.buscar = async function(req, res, next) {
  try {
    const prato = await Prato.findById(req.params.id);
    if (!prato) return res.status(404).json({ erro: "Prato não encontrado" });
    res.json(prato);
  } catch (err) { next(err); }
};

// POST /api/pratos — protegido
exports.criar = async function(req, res, next) {
  try {
    req.body.criadoPor = req.userId;
    const prato = await Prato.create(req.body);
    res.status(201).json(prato);
  } catch (err) { next(err); }
};

// PUT /api/pratos/:id — protegido
exports.atualizar = async function(req, res, next) {
  try {
    const prato = await Prato.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!prato) return res.status(404).json({ erro: "Prato não encontrado" });
    res.json(prato);
  } catch (err) { next(err); }
};

// DELETE /api/pratos/:id — protegido
exports.remover = async function(req, res, next) {
  try {
    const prato = await Prato.findByIdAndDelete(req.params.id);
    if (!prato) return res.status(404).json({ erro: "Prato não encontrado" });
    res.status(204).send();
  } catch (err) { next(err); }
};
