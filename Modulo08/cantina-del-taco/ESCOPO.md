# Documento de Escopo — Projeto Integrador

## Informações do projeto

- **Nome do projeto:** Cantina del Taco
- **Descrição:** Cardápio digital para um restaurante de comida mexicana. Clientes acessam o cardápio online com filtros por categoria, busca por nome e ordenação por preço. O dono do restaurante faz login em um painel de administração protegido por JWT para cadastrar, editar e remover pratos.
- **Integrantes:** Luis Gomes (Full-stack — arquitetura, back-end, front-end, deploy e documentação)
- **Problema que resolve:** Restaurantes pequenos dependem de cardápios impressos, caros de atualizar e fáceis de desatualizar. O cardápio digital permite atualizar preços e disponibilidade em tempo real, sem custo de reimpressão.
- **Público-alvo:** Clientes do restaurante (consultam o cardápio pelo celular) e o administrador do restaurante (gerencia os pratos).

## Funcionalidades

### MVP

- Cardápio público com listagem de pratos por categoria
- Busca por nome e filtro por categoria
- Ordenação por preço
- Indicador de nível de picância (0 a 3 pimentas)
- Registro e login de administrador (JWT)
- Painel admin: criar, editar, excluir e listar pratos (CRUD completo)
- Controle de disponibilidade do prato (aparece/some do cardápio público)
- Feedback visual de loading, sucesso e erro em todas as operações

### Páginas/telas

| Página | Descrição | Acesso |
|--------|-----------|--------|
| `index.html` | Cardápio público com filtros | Público |
| `admin.html` | Login/registro + painel de gerenciamento | Login obrigatório para o painel |

### Endpoints da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST   | /api/auth/registrar | Criar conta de admin | Não |
| POST   | /api/auth/login | Login (retorna token JWT) | Não |
| GET    | /api/pratos | Listar pratos disponíveis (filtros: categoria, busca, ordem) | Não |
| GET    | /api/pratos/admin | Listar todos os pratos (inclui indisponíveis) | Sim |
| GET    | /api/pratos/:id | Buscar prato por id | Não |
| POST   | /api/pratos | Criar prato | Sim |
| PUT    | /api/pratos/:id | Atualizar prato | Sim |
| DELETE | /api/pratos/:id | Remover prato | Sim |

### Collections no MongoDB

- **usuarios** — nome, email (único), senha (hash bcrypt), timestamps
- **pratos** — nome, descricao, preco, categoria (enum), picante (0-3), disponivel, criadoPor (ref Usuario), timestamps

### Recursos extras (se der tempo)

- Upload de foto do prato
- Pedidos online com carrinho
- Painel de pedidos para a cozinha
