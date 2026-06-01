db.alunos.insertMany([
  { nome: 'Ana Silva',   email: 'ana@email.com',    idade: 22, curso: 'Web',    notas: [8.5, 9.0, 7.8], ativo: true  },
  { nome: 'Carlos Lima', email: 'carlos@email.com', idade: 20, curso: 'Mobile', notas: [7.0, 6.5, 8.0], ativo: true  },
  { nome: 'Maria Souza', email: 'maria@email.com',  idade: 25, curso: 'Web',    notas: [9.5, 9.0, 9.8], ativo: true  },
  { nome: 'Pedro Costa', email: 'pedro@email.com',  idade: 19, curso: 'Dados',  notas: [6.0, 7.5, 6.8], ativo: false },
  { nome: 'Julia Ramos', email: 'julia@email.com',  idade: 23, curso: 'Web',    notas: [8.0, 8.5, 9.0], ativo: true  }
]);

db.alunos.find();

db.alunos.findOne({ nome: 'Ana Silva' });

db.alunos.find({ idade: { $lt: 22 } });

db.alunos.find().sort({ notas: -1 });

db.alunos.updateOne(
  { email: 'carlos@email.com' },
  { $set: { idade: 21 } }
);

db.alunos.updateOne(
  { nome: 'Ana Silva' },
  { $push: { notas: 10.0 } }
);

db.alunos.deleteOne({ email: 'pedro@email.com' });
