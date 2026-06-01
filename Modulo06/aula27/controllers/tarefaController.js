let tarefas = [
  { id: 1, titulo: 'Estudar Express', feita: false },
  { id: 2, titulo: 'Criar API', feita: false }
];

exports.listar = (req, res) => {
  res.json(tarefas);
};

exports.buscar = (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Nao encontrada' });
  res.json(tarefa);
};

exports.criar = (req, res) => {
  const nova = { id: tarefas.length + 1, ...req.body, feita: false };
  tarefas.push(nova);
  res.status(201).json(nova);
};

exports.atualizar = (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Nao encontrada' });
  Object.assign(tarefa, req.body);
  res.json(tarefa);
};

exports.remover = (req, res) => {
  tarefas = tarefas.filter(t => t.id != req.params.id);
  res.json({ mensagem: 'Removida' });
};
