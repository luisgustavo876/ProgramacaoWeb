var perguntas = [];
var atual = 0;
var pontos = 0;
var respondeu = false;

var elInicio    = document.getElementById('inicio');
var elQuiz      = document.getElementById('quiz');
var elResultado = document.getElementById('resultado');
var elProgresso = document.getElementById('progresso');
var elPergunta  = document.getElementById('pergunta');
var elOpcoes    = document.getElementById('opcoes');
var btnIniciar  = document.getElementById('btnIniciar');

async function buscarPerguntas() {
  var url = 'https://tryvia.ptr.red/api.php?amount=10&type=multiple';

  try {
    var res  = await fetch(url);
    var data = await res.json();
    perguntas = data.results;
  } catch (erro) {
    console.log('Erro ao buscar perguntas:', erro);
  }
}

function embaralhar(array) {
  return array.sort(function() {
    return Math.random() - 0.5;
  });
}

function getAlternativas(pergunta) {
  var todas = pergunta.incorrect_answers.concat(pergunta.correct_answer);
  return embaralhar(todas);
}

function exibirPergunta() {
  respondeu = false;

  var p = perguntas[atual];
  var alternativas = getAlternativas(p);

  elProgresso.textContent = (atual + 1) + ' / ' + perguntas.length;

  elPergunta.innerHTML = p.question;

  elOpcoes.innerHTML = '';
  alternativas.forEach(function(alt) {
    var btn = document.createElement('button');
    btn.innerHTML   = alt;
    btn.className   = 'opcao';
    elOpcoes.appendChild(btn);
  });
}

elOpcoes.addEventListener('click', function(e) {

  if (!e.target.classList.contains('opcao')) return;

  if (respondeu) return;
  respondeu = true;

  var resposta = e.target.textContent;
  var correta  = perguntas[atual].correct_answer;

  var todosOsBotoes = elOpcoes.querySelectorAll('.opcao');
  todosOsBotoes.forEach(function(btn) {
    btn.disabled = true;
  });

  if (resposta === correta) {
    pontos++;
    e.target.classList.add('correta');
  } else {
    e.target.classList.add('errada');
  }

  setTimeout(function() {
    atual++;
    if (atual < perguntas.length) {
      exibirPergunta();
    } else {
      exibirResultado();
    }
  }, 1000);
});

function exibirResultado() {
  elQuiz.hidden      = true;
  elResultado.hidden = false;

  var total = perguntas.length;
  var pct   = Math.round((pontos / total) * 100);

  var msg = 'Tente novamente!';
  if (pct >= 80) {
    msg = 'Excelente! 🎉';
  } else if (pct >= 60) {
    msg = 'Bom trabalho! 👍';
  }

  elResultado.innerHTML =
    '<h2>' + msg + '</h2>' +
    '<p>' + pontos + ' de ' + total + ' acertos (' + pct + '%)</p>' +
    '<button id="btnReiniciar">Jogar novamente</button>';

  document.getElementById('btnReiniciar').addEventListener('click', function() {
    reiniciar();
  });
}

function reiniciar() {
  atual     = 0;
  pontos    = 0;
  respondeu = false;

  elResultado.hidden = true;
  elInicio.hidden    = false;
}

btnIniciar.addEventListener('click', async function() {
  elInicio.hidden = true;
  elProgresso.textContent = 'Carregando...';
  elQuiz.hidden = false;

  await buscarPerguntas();

  exibirPergunta();
});
