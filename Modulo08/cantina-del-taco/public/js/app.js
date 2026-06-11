// ============================================
// Cardápio público — consome a API via fetch
// ============================================
const API = "/api/pratos";

const elCardapio = document.getElementById("cardapio");
const elStatus   = document.getElementById("status");
const elBusca    = document.getElementById("busca");
const elOrdem    = document.getElementById("ordem");
const elChips    = document.querySelectorAll(".chip");

let categoriaAtiva = "";

// Ícone de fallback por categoria (quando o prato não tem foto)
const iconeCategoria = {
  "Tacos":       "fa-pepper-hot",
  "Burritos":    "fa-rug",
  "Quesadillas": "fa-cheese",
  "Nachos":      "fa-play",
  "Bebidas":     "fa-glass-water",
  "Sobremesas":  "fa-ice-cream"
};

// Escapa HTML para evitar XSS
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function mostrarStatus(texto, tipo) {
  elStatus.textContent = texto;
  elStatus.className = "status " + (tipo || "");
}

function pimentas(nivel) {
  if (!nivel) return '<span class="suave"><i class="fa-solid fa-leaf"></i> suave</span>';
  let html = "";
  for (let i = 0; i < nivel; i++) html += '<i class="fa-solid fa-pepper-hot"></i> ';
  return html;
}

function fotoDoCard(p) {
  const icone = iconeCategoria[p.categoria] || "fa-utensils";
  const fallback = `<div class='sem-foto'><i class='fa-solid ${icone}'></i></div>`;
  if (!p.imagem) return fallback;
  // onerror: se a URL da foto falhar, mostra o placeholder com ícone
  return `<img src="${escapeHTML(p.imagem)}" alt="${escapeHTML(p.nome)}" loading="lazy"
    onerror="this.outerHTML=&quot;${fallback}&quot;">`;
}

function renderizar(pratos) {
  if (pratos.length === 0) {
    elCardapio.innerHTML = "";
    mostrarStatus("Nenhum prato encontrado.", "erro");
    return;
  }

  elCardapio.innerHTML = pratos.map(function(p) {
    return `
      <article class="card">
        <div class="card-foto">
          ${fotoDoCard(p)}
          <span class="categoria">${escapeHTML(p.categoria)}</span>
        </div>
        <div class="card-corpo">
          <h3>${escapeHTML(p.nome)}</h3>
          <p class="descricao">${escapeHTML(p.descricao || "")}</p>
          <div class="rodape-card">
            <span class="preco">R$ ${Number(p.preco).toFixed(2).replace(".", ",")}</span>
            <span class="picante" title="Nível de picância">${pimentas(p.picante)}</span>
          </div>
        </div>
      </article>`;
  }).join("");
}

async function carregarCardapio() {
  mostrarStatus("Carregando cardápio...", "loading");
  try {
    const params = new URLSearchParams();
    if (elBusca.value)   params.set("busca", elBusca.value);
    if (categoriaAtiva)  params.set("categoria", categoriaAtiva);
    if (elOrdem.value)   params.set("ordem", elOrdem.value);

    const res = await fetch(API + "?" + params.toString());
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.erro || "Erro ao carregar cardápio");
    }
    const pratos = await res.json();

    mostrarStatus("", "");
    renderizar(pratos);
  } catch (err) {
    mostrarStatus(err.message, "erro");
  }
}

// Chips de categoria
elChips.forEach(function(chip) {
  chip.addEventListener("click", function() {
    elChips.forEach(function(c) { c.classList.remove("ativo"); });
    chip.classList.add("ativo");
    categoriaAtiva = chip.dataset.cat;
    carregarCardapio();
  });
});

// Busca com debounce
elBusca.addEventListener("input", function() {
  clearTimeout(elBusca._timer);
  elBusca._timer = setTimeout(carregarCardapio, 400);
});
elOrdem.addEventListener("change", carregarCardapio);

carregarCardapio();
