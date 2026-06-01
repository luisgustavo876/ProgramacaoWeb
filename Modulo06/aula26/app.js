const { somar, saudacao } = require('./utils');
const fs = require('fs');
const http = require('http');

const resultadoSoma = somar(10, 5);
const mensagem = saudacao('Luis');

console.log(mensagem);
console.log('Soma: ' + resultadoSoma);

fs.writeFileSync('resultado.txt', mensagem + '\nSoma: ' + resultadoSoma);
console.log('Arquivo resultado.txt criado!');

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>' + mensagem + '</h1><p>Soma: ' + resultadoSoma + '</p>');
});

server.listen(3000, function() {
  console.log('Servidor rodando em http://localhost:3000');
});
