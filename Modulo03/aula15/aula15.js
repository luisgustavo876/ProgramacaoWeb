const form = document.querySelector("#form-tarefa");
const inputNovaTarefa = document.querySelector("#nova-tarefa");
const listaTarefas = document.querySelector("#lista-tarefas");
const inputBusca = document.querySelector("#busca");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizarTarefas() {
    listaTarefas.innerHTML = "";
    
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.dataset.index = index;
        
        if (tarefa.concluida) li.classList.add("riscada");

        const spanTexto = document.createElement("span");
        spanTexto.textContent = tarefa.texto;

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "X";
        btnRemover.classList.add("btn-remover");

        li.appendChild(spanTexto);
        li.appendChild(btnRemover);
        listaTarefas.appendChild(li);
    });
}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const texto = inputNovaTarefa.value.trim();
    if (texto) {
        tarefas.push({ texto, concluida: false });
        salvarTarefas();
        renderizarTarefas();
        inputNovaTarefa.value = "";
    }
});

listaTarefas.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    const index = li.dataset.index;

    if (event.target.classList.contains("btn-remover")) {
        tarefas.splice(index, 1);
    } else {
        tarefas[index].concluida = !tarefas[index].concluida;
    }

    salvarTarefas();
    renderizarTarefas();
    
    inputBusca.dispatchEvent(new Event("input"));
});

inputBusca.addEventListener("input", (event) => {
    const termoBusca = event.target.value.toLowerCase();
    const lis = listaTarefas.querySelectorAll("li");

    lis.forEach(li => {
        const textoTarefa = li.querySelector("span").textContent.toLowerCase();
        if (textoTarefa.includes(termoBusca)) {
            li.classList.remove("escondido");
        } else {
            li.classList.add("escondido");
        }
    });
});

renderizarTarefas();
