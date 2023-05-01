const baseURL = 'http://127.0.0.1:8000/tarefas';
const token = `Bearer ${localStorage.getItem("token_filmes")}`;

// Obtem a tabela onde as tarefas serão exibidas
var tabelaTarefas = document.querySelector("#list-tarefas");

// Função que cria uma nova linha na tabela para exibir uma tarefa
function criarLinhaTarefa(tarefa) {
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${tarefa.descricao}</td>
    <td>${tarefa.nivel}</td>
    <td>${tarefa.prioridade}</td>
    <td>${tarefa.situacao}</td>
    <td>${tarefa.responsavel}</td>
    
  `;
  return linha;
}

// Função que carrega as tarefas do backend e exibe na tabela
function carregarTarefas() {
  fetch(baseURL, {
    headers: {
      Authorization: token
    }
  })
  .then(response => response.json())
  .then(data => {
    // Itera sobre a lista de tarefas e cria uma nova linha na tabela para cada tarefa
    data.forEach(tarefa => {
      const linhaTarefa = criarLinhaTarefa(tarefa);
      tabelaTarefas.appendChild(linhaTarefa);
    });
  })
  .catch(error => console.error(error));
}

// Executa a função carregarTarefas após a página ser carregada
window.addEventListener("load", carregarTarefas);

// Obtem o botão do formulário da página HTML
var btnSalvar = document.querySelector("#btn-confirmar");

// Executa a função anonima ao clicar no botão
btnSalvar.addEventListener("click", function (event) {
    // Evita o comportamento padrão que seria recarregar a página
    event.preventDefault();

    // Obtem o formulário da nossa página HTML
    var frmtarefa = document.querySelector("#form-tarefa");

    // Cria um objeto vazio para armazenar os dados do formulário
    var dados = {};

    // Atribui os valores dos campos do formulário às propriedades do objeto "dados"
    dados.descricao = frmtarefa.descricao.value;
    dados.nivel = frmtarefa.nivel.value;
    dados.prioridade = frmtarefa.prioridade.value;
    dados.situacao = frmtarefa.situacao.value;
    dados.responsavel = frmtarefa.responsavel.value;

    // Converte o objeto "dados" em JSON
    var json = JSON.stringify(dados);

    // Envia o JSON para o backend usando a API Fetch
    fetch(baseURL, {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Limpa os campos do formulário após enviar os dados
        frmtarefa.reset();
    })
    .catch(error => console.error(error));
});
async function carregar_tarefas() {
  console.log("Api - Tarefas")

  const opcoes = {
    headers: {
      Authorization: token
    }
  }
  const response = await fetch(baseURL, opcoes)
  const status = response.status

  if (response.status === 200) {
    filmes = await response.json()
    atualizar_tela()
  } else {
    // const result = await response.json()
    alert(`Você não está autenticado!`)
    // redicionar para tela de login
    window.location.replace("login.html")
  }

  // console.log('Status', status)
  // console.log('Dados', dados)
}
// Obtem o botão de logout da página HTML
var btnLogout = document.querySelector("#logout");

// Executa a função logout() ao clicar no botão de logout
btnLogout.addEventListener("click", logout);
function logout() {
  localStorage.clear();
  window.location.replace("login.html");
}
