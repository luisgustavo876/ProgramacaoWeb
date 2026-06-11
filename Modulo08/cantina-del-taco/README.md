# Cantina del Taco

Cardápio digital para um restaurante de comida mexicana: o cliente consulta o cardápio com filtros e busca, e o administrador gerencia os pratos em um painel protegido por autenticação JWT.

## Integrantes
- Luis Gomes (Full-stack)

## Tecnologias
- Node.js, Express, MongoDB, JWT
- HTML, CSS, JavaScript

## Como rodar
1. Clone o repo: `git clone URL`
2. Instale: `npm install`
3. Configure o `.env` (ver `.env.example`)
4. Rode: `npm run dev`
5. Acesse: `http://localhost:3000`

## Endpoints da API
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST   | /api/auth/registrar | Criar conta | Nao |
| POST   | /api/auth/login | Login (retorna token JWT) | Nao |
| GET    | /api/pratos | Listar pratos disponiveis (filtros: categoria, busca, ordem) | Nao |
| GET    | /api/pratos/admin | Listar todos os pratos (painel) | Sim |
| GET    | /api/pratos/:id | Buscar prato por id | Nao |
| POST   | /api/pratos | Criar prato | Sim |
| PUT    | /api/pratos/:id | Atualizar prato | Sim |
| DELETE | /api/pratos/:id | Remover prato | Sim |

## Deploy
Link: https://cantina-del-taco.vercel.app
