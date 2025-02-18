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

//Função responsável por criar um novo quadro
function createaboard(){

    var name = window.prompt("Qual o nome do quadro?"); //Coleta o nome do quadro
    var background = window.prompt("Qual a cor de fundo que deseja para o quadro?"); //Coleta a cor de fundo escolhida para o quadro

    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados do arquivo JSON

    //Criação do novo quadro
    let novoquadro = {

        id: Date.now(), //ID gerado com base na data de criação
        name: name, //Nome inserido pelo usuário
        background: background //Imagem escolhida pelo usuário

    }

    console.log("Criando quadro: ", novoquadro.name, " Id: ", novoquadro.id, " Cor de fundo: ", novoquadro.background); //Registra no console

    //Salva o novo quadro no arquivo JSON
    dadosdotrello.quadros.push(novoquadro); 
    localStorage.setItem("dadosdotrello", JSON.stringify(dadosdotrello));

}

//O que fazer ao carregar a página
window.onload = function(){

    //Carrega os quadros existentes e os exibe na tela

}