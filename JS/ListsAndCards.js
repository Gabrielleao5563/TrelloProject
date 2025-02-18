//Variáveis
var ListPresentingMode = 1; //Salva se as etiquetas ficarao salvas abertas ou fechadas

var ListsAmount = 0; //Salva a quantidade de listas existente
var CardsAmount = 0; //Salva a quantidade de cartoes existentes
var LabelsAmount = 0; // Armazena a quantidade de etiquetas existente

//Dados iniciais para novos acessos
const datapadrao = {
    quadros: [], //Variavel que vai guardar todos os quadros
    listas: [], //Variavel que vai guardar todas as listas
    cartoes: [] //Variavel que vai guardar todos os cartoes e seus dados
}

//Função que verifica se ja existe um arquivo JSON local
function checkjsonfile(){

    //Se o arquivo nao existir
    if(!localStorage.getItem("dadosdotrello")){

        //Criar o arquivo e inserir os dados padrao
        localStorage.setItem("dadosdotrello", JSON.stringify(datapadrao));
        console.log("Arquivo JSON criado");
    }else{
        //Caso arquivo já existir, nao fazer nada
        console.log("Arquivo JSON já existe");
    }
}

let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados atuais do arquivo JSON e insere para ser usado no código
console.log("Dados encontrados no arquivo JSON ao carregar: " + dadosdotrello); //Registra o que foi encontrado no arquivo JSON para o console

//Assegura que o usuário não consiga acessar essa página sem ter criado um quadro
window.onload = function(){

    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Acessa o arquivo JSON
    let quadroatual = localStorage.getItem("currentboard"); //Procura saber se tem um quadro aberto

    //Verifica se existe algum quadro criado
    let existequadro = dadosdotrello && dadosdotrello.quadros && dadosdotrello.quadros.lenght > 0;

    //Caso não exista, redireciona o usuario
    if(!existequadro || !quadroatual){
        window.location.href = "Boards.html";
    }

}





//Funcao responsável por criar uma nova lista
function createalist(boardid, name, position){

    //Pega todos os dados já salvos no cache do site sobre as listas e cartoes
    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello"));

    //Criação de uma nova lista
    let novalista = {
        id: Date.now(), //Insere o ID da lista como sendo a data de criação
        boardid: boardid, //Associa a lista ao quadro onde ela foi gerada
        name: name, //Insere o nome da lista como o nome digitado pelo usuario
        position: position, //Armazena a atual posição da lista
        cardcount: 0 //Consta quantos cartões estão salvos dentro desta lista
    }

    //Insere estes dados dentro da seção listas no arquivo JSON temporario
    dadosdotrello.listas.push(novalista);

    //Passa os dados para o JSON permanente
    localStorage.setItem("dadosdotrello", JSON.stringify(dadosdotrello));
    console.log("Lista adicionada: " + novalista);
}

//Define qual quadro esta atualmente em uso
function setcurrentboard(boardid){

    //Armazena a informação no arquivo JSON
    localStorage.setItem("currentboard", boardid);

}

//Verifica qual o quadro atualmente em uso
function getcurrentboard(){

    //Retorna o resultado como um numero inteiro
    return parseInt(localStorage.getItem("currentboard")) || null;

}

//Recarrega o conteúdo ao trocar de quadro
function switchboard(boardid){

    //Salva o novo quadro como o atualmente em uso
    setcurrentboard(boardid);

    //Recarrega as listas para o novo quadro
    loadthelists();

}

//Funcao responsavel por carregar todas as listas existentes
function loadthelists(){

    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Coleta as informações das listas
    let quadroemuso = getcurrentboard(); //Acessa a informação de qual quadro está em uso

    //Caso não exista quadro aberto
    if(!quadroemuso) {

        return; //Quebra a execução da função
    
    }

    //Mantem apenas as listas relacionadas ao quadro atual e as coloca na ordem de aprensentação
    let listasordenadas = dadosdotrello.listas.filter(lista => lista.boardid === quadroemuso).sort((a, b) => a.position - b.position);

    var divdaslistas = document.getElementById("ListsSeparation"); //Obtem acesso total a div que contem as listas
    var conteudotemporario = ""; //Variavel que vai segurar conteúdos temporariamente para ajudar no manuseio dos dados

    //Executa uma vez para cada uma das listas
    listasordenadas.forEach( lista => {
        
        //Cria o bloco de conteúdo personalizando as informações com base no arquivo JSON
        conteudotemporario = `
            <!--Lista "${lista.name}"-->
            <div draggable="True" Class="List" id="List${lista.id}">

                <p Class="ListNameText" id="NomeLista${lista.id}">${lista.name}</p>

            </div>
        `

        //Insere o conteúdo gerado na div para exibir a lista na tela
        divdaslistas.innerHTML = divdaslistas.innerHTML + conteudotemporario;

    })

}




//ABERTURA E FECHAMENTO DE JANELAS, ASSIM COMO APRESENTAÇÃO DE PROMPTS AO USUARIO (INTERFACE)

//Abre uma janela especificada
function opentab(tabid, how){

    var janela = document.getElementById(tabid); //Acessa o elemento
    janela.style.display=how; //Exibe o elemento

}

//Fecha uma janela especificada
function closetab(tabid){

    var janela = document.getElementById(tabid); //Acessa o elemento
    janela.style.display="none"; //Oculta o elemento

}

function loadsidemenuboards(){
    
}




//FUNCIONAMENTO APENAS VISUAL E COSMÉTICO

//Função que Faz o Texto Aparecer ou Desapareçer quando o usuário clica em uma etiqueta
function changelistpresentingmode(){

    switch(ListPresentingMode){

        case 1:
            ListPresentingMode = 0;
            decision = "none";
            break;
        default:
            ListPresentingMode = 1;
            decision = "initial";
            break;
    }

    for(var i=LabelsAmount; i>0; i--){
        document.getElementById(String("Label" + i)).style.display=decision;
    }
}