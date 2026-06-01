const express = require('express');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/tarefas', require('./routes/tarefaRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
