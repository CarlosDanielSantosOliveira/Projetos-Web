const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
  }

  inputTarefa.addEventListener('keypress', function(e) { //vai pegar o evento do que o usuario digitar 
    if (e.keyCode === 13) { // esse codigo serve para que o enter funcione na hora do input
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
      }
    });

function limpaInput() {
    inputTarefa.value = ''; //vai limpar a caixa de texto após o input da tarefa
    inputTarefa.focus();//vai puxar o foco para a caixa de texto
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = '';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
  }
  
btnTarefa.addEventListener('click', function () { //Estou capturando o evento de lique no botão tarefa e criando um função anônima
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) { //Esta função vai me mostrar no console do navegador qual elemento estou clicando no código
    const el = e.target;
    
    if (el.classList.contains('apagar')) {
        //console.log(el.parentElement); // vai me mostrar no console quem é o pai do elemento que eu criar
        el.parentElement.remove(); //vai remover o pai do elemento, consequentemente o elemento também sera removido
        salvarTarefas();
       }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) { //estou criando um laço de repetição onde vai buscar as tarefas e nos mostrar no console
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto); //o push vai fazer com que tudo o que estiver no tarefaTexto, entre no array da listaDetarefas
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //estou pegando a String do meu array e convertendo para json
    localStorage.setItem('tarefas', tarefasJSON); //aqui estamos salvando as tarefas em uma mini base de dados dentro do navegador em forma de String
}
    function adicionaTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);
       //estamos convertendo as tarefas para um array novamente atraves do parse
        
        for(let tarefa of listaDeTarefas) {
            criaTarefa(tarefa);
          }
        }
        adicionaTarefasSalvas();
    
