const alunos = [
  { nome: "Ana", nota1: 8, nota2: 7 },
  { nome: "Bruno", nota1: 4, nota2: 5 },
  { nome: "Carlos", nota1: 9, nota2: 10 },
  { nome: "Daniela", nota1: 6, nota2: 5 },
  { nome: "Eduardo", nota1: 7, nota2: 8 }
];

const calcularMedia = (nota1, nota2) => (nota1 + nota2) / 2;

const alunosComMedia = alunos.map(aluno => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2)
}));

alunosComMedia.sort((a, b) => b.media - a.media);

const aprovados = alunosComMedia.filter(aluno => aluno.media >= 6);
const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const mediaGeral = alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0) / alunosComMedia.length;

console.log(`--- Ranking de Alunos ---`);
alunosComMedia.forEach(aluno => {
  console.log(`Aluno(a): ${aluno.nome} | Média: ${aluno.media}`);
});

console.log(`\n--- Aprovados ---`);
aprovados.forEach(aluno => {
  console.log(`${aluno.nome} passou com média ${aluno.media}`);
});

console.log(`\n--- Reprovados ---`);
reprovados.forEach(aluno => {
  console.log(`${aluno.nome} reprovou com média ${aluno.media}`);
});

console.log(`\n--- Resumo da Turma ---`);
console.log(`Média geral: ${mediaGeral.toFixed(2)}`);
