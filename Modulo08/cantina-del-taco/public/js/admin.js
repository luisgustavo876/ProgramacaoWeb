// ============================================
// Painel admin — login JWT + CRUD de pratos
// ============================================
const API_AUTH   = "/api/auth";
const API_PRATOS = "/api/pratos";

// --- Elementos ---
const secaoLogin  = document.getElementById("secao-login");
const secaoPainel = document.getElementById("secao-painel");
const formAuth    = document.getElementById("form-auth");
const campoNome   = document.getElementById("campo-nome");
const tituloAuth  = document.getElementById("titulo-auth");
const btnAuth     = document.getElementById("btn-auth");
const btnTroca    = document.getElementById("btn-troca");
const textoTroca  = document.getElementById("texto-troca");
const statusAuth  = document.getElementById("status-auth");
const btnSair     = document.getElementById("btn-sair");

const formPrato       = document.getElementById("form-prato");
const tituloFormPrato = document.getElementById("titulo-form-prato");
const btnCancelar     = document.getElementById("btn-cancelar");
const statusPrato     = document.getElementById("status-prato");
const statusLista     = document.getElementById("status-lista");
const listaPratos     = document.getElementById("lista-pratos");

let modoRegistro = false;

// --- Helpers ---
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function mostrar(el, texto, tipo) {
  el.textContent = texto;
  el.className = "status " + (tipo || "");
}

function getToken() { return localStorage.getItem("token"); }

function headersAuth() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  };
}

// --- Sessão ---
function entrarNoPainel() {
  secaoLogin.classList.add("escondido");
  secaoPainel.classList.remove("escondido");
  btnSair.classList.remove("escondido");
  document.getElementById("nome-usuario").textContent = localStorage.getItem("nome") || "admin";
  carregarPratos();
}

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("nome");
  secaoPainel.classList.add("escondido");
  btnSair.classList.add("escondido");
  secaoLogin.classList.remove("escondido");
}

btnSair.addEventListener("click", sair);

// --- Login / Registro ---
btnTroca.addEventListener("click", function() {
  modoRegistro = !modoRegistro;
  campoNome.classList.toggle("escondido", !modoRegistro);
  document.getElementById("nome").required = modoRegistro;
  tituloAuth.textContent = modoRegistro ? "Registrar" : "Entrar";
  btnAuth.textContent    = modoRegistro ? "Registrar" : "Entrar";
  textoTroca.textContent = modoRegistro ? "Já tem conta?" : "Não tem conta?";
  btnTroca.textContent   = modoRegistro ? "Entrar" : "Registrar";
  mostrar(statusAuth, "", "");
});

formAuth.addEventListener("submit", async function(e) {
  e.preventDefault();
  mostrar(statusAuth, "Enviando...", "loading");

  const dados = {
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };
  if (modoRegistro) dados.nome = document.getElementById("nome").value;

  try {
    const rota = modoRegistro ? "/registrar" : "/login";
    const res = await fetch(API_AUTH + rota, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.erro || "Erro na autenticação");

    if (modoRegistro) {
      mostrar(statusAuth, "Conta criada! Agora faça login.", "sucesso");
      btnTroca.click();
    } else {
      localStorage.setItem("token", json.token);
      localStorage.setItem("nome", json.nome);
      entrarNoPainel();
    }
  } catch (err) {
    mostrar(statusAuth, err.message, "erro");
  }
});

// --- CRUD de pratos ---
async function carregarPratos() {
  mostrar(statusLista, "Carregando pratos...", "loading");
  try {
    const res = await fetch(API_PRATOS + "/admin", { headers: headersAuth() });
    if (res.status === 401) { sair(); return; }
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.erro || "Erro ao carregar pratos");
    }
    const pratos = await res.json();
    mostrar(statusLista, "", "");
    renderizarTabela(pratos);
  } catch (err) {
    mostrar(statusLista, err.message, "erro");
  }
}

function renderizarTabela(pratos) {
  if (pratos.length === 0) {
    listaPratos.innerHTML = `<tr><td colspan="7">Nenhum prato cadastrado ainda.</td></tr>`;
    return;
  }

  listaPratos.innerHTML = pratos.map(function(p) {
    const foto = p.imagem
      ? `<img class="miniatura" src="${escapeHTML(p.imagem)}" alt="" onerror="this.outerHTML='<div class=&quot;sem-miniatura&quot;><i class=&quot;fa-solid fa-utensils&quot;></i></div>'">`
      : `<div class="sem-miniatura"><i class="fa-solid fa-utensils"></i></div>`;
    return `
      <tr class="${p.disponivel ? "" : "indisponivel"}">
        <td>${foto}</td>
        <td>${escapeHTML(p.nome)}</td>
        <td>${escapeHTML(p.categoria)}</td>
        <td>R$ ${Number(p.preco).toFixed(2).replace(".", ",")}</td>
        <td>${p.picante ? '<i class="fa-solid fa-pepper-hot"></i> '.repeat(p.picante) : "—"}</td>
        <td>${p.disponivel ? "Sim" : "Não"}</td>
        <td>
          <button class="btn btn-primario" data-editar="${p._id}">Editar</button>
          <button class="btn btn-perigo" data-remover="${p._id}">Excluir</button>
        </td>
      </tr>`;
  }).join("");
}

// Delegação de eventos para editar/excluir
listaPratos.addEventListener("click", async function(e) {
  const idEditar  = e.target.dataset.editar;
  const idRemover = e.target.dataset.remover;

  if (idEditar) {
    try {
      const res = await fetch(`${API_PRATOS}/${idEditar}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.erro || "Erro ao buscar prato");
      }
      const p = await res.json();
      document.getElementById("prato-id").value         = p._id;
      document.getElementById("prato-nome").value       = p.nome;
      document.getElementById("prato-preco").value      = p.preco;
      document.getElementById("prato-descricao").value  = p.descricao || "";
      document.getElementById("prato-imagem").value     = p.imagem || "";
      document.getElementById("prato-categoria").value  = p.categoria;
      document.getElementById("prato-picante").value    = p.picante || 0;
      document.getElementById("prato-disponivel").value = String(p.disponivel);
      tituloFormPrato.textContent = "Editar prato";
      btnCancelar.classList.remove("escondido");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      mostrar(statusLista, err.message, "erro");
    }
  }

  if (idRemover) {
    if (!confirm("Tem certeza que deseja excluir este prato?")) return;
    try {
      const res = await fetch(`${API_PRATOS}/${idRemover}`, {
        method: "DELETE",
        headers: headersAuth()
      });
      if (res.status === 401) { sair(); return; }
      if (!res.ok && res.status !== 204) {
        const err = await res.json();
        throw new Error(err.erro || "Erro ao excluir");
      }
      mostrar(statusLista, "Prato excluído!", "sucesso");
      carregarPratos();
    } catch (err) {
      mostrar(statusLista, err.message, "erro");
    }
  }
});

function limparFormPrato() {
  formPrato.reset();
  document.getElementById("prato-id").value = "";
  tituloFormPrato.textContent = "Novo prato";
  btnCancelar.classList.add("escondido");
}

btnCancelar.addEventListener("click", limparFormPrato);

formPrato.addEventListener("submit", async function(e) {
  e.preventDefault();
  mostrar(statusPrato, "Salvando...", "loading");

  const id = document.getElementById("prato-id").value;
  const dados = {
    nome:       document.getElementById("prato-nome").value,
    preco:      Number(document.getElementById("prato-preco").value),
    descricao:  document.getElementById("prato-descricao").value,
    imagem:     document.getElementById("prato-imagem").value,
    categoria:  document.getElementById("prato-categoria").value,
    picante:    Number(document.getElementById("prato-picante").value),
    disponivel: document.getElementById("prato-disponivel").value === "true"
  };

  try {
    const res = await fetch(id ? `${API_PRATOS}/${id}` : API_PRATOS, {
      method: id ? "PUT" : "POST",
      headers: headersAuth(),
      body: JSON.stringify(dados)
    });
    if (res.status === 401) { sair(); return; }
    const json = await res.json();
    if (!res.ok) throw new Error(json.erro || "Erro ao salvar");

    mostrar(statusPrato, id ? "Prato atualizado!" : "Prato criado!", "sucesso");
    limparFormPrato();
    carregarPratos();
  } catch (err) {
    mostrar(statusPrato, err.message, "erro");
  }
});

// --- Inicialização ---
if (getToken()) entrarNoPainel();
