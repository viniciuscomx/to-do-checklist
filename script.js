let tarefas = [];
let filtroTarefa = "";
let filtroTipo = "";

function adicionarTarefa() {
  const titulo = document.getElementById("titulo").value.trim();
  const tipo = document.getElementById("tipo").value;

  if (!titulo) {
    alert("Digite uma tarefa válida!");
    return;
  }

  const tarefa = {
    id: Date.now(),
    titulo,
    tipo,
    concluida: false,
  };

  tarefas.push(tarefa);
  document.getElementById("titulo").value = "";
  renderizarTarefas();
}

function removerTarefa(id) {
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  renderizarTarefas();
}

function concluirTarefa(id) {
  tarefas = tarefas.map(tarefa =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
  );
  renderizarTarefas();
}

function filtrarTarefas() {
  filtroTarefa = document.getElementById("filtro-tarefa").value.trim().toLowerCase();
  filtroTipo = document.getElementById("filtro-tipo").value;

  renderizarTarefas();
}

function renderizarTarefas() {
  const container = document.getElementById("blocos-tarefas");
  container.innerHTML = "";

  const tipos = ["Trabalho", "Estudos", "Pessoal"];

  tipos.forEach(tipo => {
    const tarefasFiltradas = tarefas.filter(t => {
      const correspondeTipo = t.tipo === tipo;
      const correspondeFiltro = filtroTarefa === "" || t.titulo.toLowerCase().includes(filtroTarefa);
      return correspondeTipo && correspondeFiltro;
    });

    const bloco = document.createElement("div");
    bloco.className = "bloco-tipo";

    const tituloTipo = document.createElement("h2");
    tituloTipo.textContent = `${tipo} (${tarefasFiltradas.length})`;
    bloco.appendChild(tituloTipo);

    const lista = document.createElement("ul");

    tarefasFiltradas.forEach(tarefa => {
      const li = document.createElement("li");
      li.className = tarefa.concluida ? "completed" : "";
      li.innerHTML = `
        <span>${tarefa.titulo}</span>
        <div class="btns">
          <button onclick="concluirTarefa(${tarefa.id})">${tarefa.concluida ? "Desfazer" : "Concluir"}</button>
          <button onclick="removerTarefa(${tarefa.id})">Excluir</button>
        </div>
      `;
      lista.appendChild(li);
    });

    bloco.appendChild(lista);
    container.appendChild(bloco);
  });
}
