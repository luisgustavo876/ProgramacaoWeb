const produtos = [
  { nome: "Notebook", preco: 4500, categoria: "eletrônicos" },
  { nome: "Camiseta", preco: 80, categoria: "vestuário" },
  { nome: "Smartphone", preco: 2500, categoria: "eletrônicos" },
  { nome: "Caneca", preco: 30, categoria: "utilidades" },
  { nome: "Fone Bluetooth", preco: 200, categoria: "eletrônicos" }
];

const container = document.querySelector("#container");
const btnFiltro = document.querySelector("#btn-filtro");
const btnLimpar = document.querySelector("#btn-limpar");

const inputNome = document.querySelector("#input-nome");
const inputPreco = document.querySelector("#input-preco");
const inputCategoria = document.querySelector("#input-categoria");
const btnAdicionar = document.querySelector("#btn-adicionar");

function renderizarCards() {
  container.innerHTML = "";
  
  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.categoria = produto.categoria.toLowerCase();
    
    const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    card.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>Preço: ${precoFormatado}</p>
      <p>Categoria: ${produto.categoria}</p>
    `;
    
    container.appendChild(card);
  });
}

btnFiltro.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    if (card.dataset.categoria !== "eletrônicos") {
      card.classList.toggle("escondido");
    }
  });
});

btnLimpar.addEventListener("click", () => {
  container.innerHTML = "";
});

btnAdicionar.addEventListener("click", () => {
  const nome = inputNome.value;
  const preco = parseFloat(inputPreco.value);
  const categoria = inputCategoria.value;

  if (nome && !isNaN(preco) && categoria) {
    produtos.push({ nome, preco, categoria });
    renderizarCards();
    
    inputNome.value = "";
    inputPreco.value = "";
    inputCategoria.value = "";
  } else {
    alert("Preencha todos os campos corretamente.");
  }
});

renderizarCards();
