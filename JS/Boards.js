//O que fazer ao carregar a página
window.onload = function(){

    //Chama a função que verifica a existência de um JSON
    verificarjson();

    //Chama a função responsável por carregar os quadros na tela
    carregarquadros();

}





//Dados iniciais para novos acessos
const datapadrao = {
    quadros: [], //Variavel que vai guardar todos os quadros
    listas: [], //Variavel que vai guardar todas as listas
    cartoes: [] //Variavel que vai guardar todos os cartoes e seus dados
}

//Função que verifica se ja existe um arquivo JSON local
function verificarjson(){

    //Se o arquivo nao existir
    if(!localStorage.getItem("dadosdotrello")){

        //Criar o arquivo e inserir os dados padrao
        localStorage.setItem("dadosdotrello", JSON.stringify(datapadrao));
        return;
    }else{
        //Caso arquivo já existir, nao fazer nada
        return;
    }
}

//Função que verifica se uma cor está no formato aceito pelo CSS
function corvalida(color){

    //Verifica se a cor se encaixa no formato Hexadecimal
    let padraohex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    if(padraohex.test(color)) return true;

    //Verifica se a cor se encaixa no formato RGB ou RGBA
    let padraorgb = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|0?\.\d+|1))?\s*\)$/;
    if(padraorgb.test(color)) return true;

    //Verifica se a cor se encaixa como nome em ingles
    let elementotemporario = document.createElement("div");
    elementotemporario.style.color = color;
    if(elementotemporario.style.color !== "") return true;

    //Se não passar em nenhum, finalizar com erro
    return false;

}

let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados atuais do arquivo JSON e insere para ser usado no código
console.log("Dados encontrados no arquivo JSON ao carregar: " + dadosdotrello); //Registra o que foi encontrado no arquivo JSON para o console





//Função responsável por criar um novo quadro
function criarumquadro(name, background){

    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados do arquivo JSON

    //Assegura que um quadro com dados nulos não seja criado
    if(!name || !background){

        //Caso existam dados nulos, cancelar criação do quadro;
        console.log("Foram encontrados dados inválidos na criação do Quadro. Operação cancelada");
        return;

    }

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

    //Recarrega os quadros após criar
    carregarquadros();

}

//Função responsável por carregar os quadros existentes na tela
function carregarquadros(){

    //Acessa a div que contem os quadros
    var div = document.getElementById("BoardsContainer");

    //variavel que segura conteúdo temporariamente durante execução
    var conteudotemporario="";

    //Limpa o conteúdo inicial
    div.innerHTML="";

    //Acessa o JSON e pega os dados
    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello"));

    //Se não for encontrado nenhum quadro existente
    if(dadosdotrello.quadros.lenght === 0){

        //Exibe dentro da página a mensagem
        div.innerHTML="<p class='genericerrortext'>Ops, não há nenhum quadro criado. Que tal criar um?</p>"

        //Finaliza a função de carregamento
        return;

    }

    //Executa a tudo a partir daqui uma vez para cada quadro existente
    dadosdotrello.quadros.forEach(quadro => {

        conteudotemporario =`
            <!-- Quadro ${quadro.name} -->
            <a onclick="definirquadroatual(${quadro.id})" class="BoardLink" href="WorkingPanel.html?quadro${quadro.id}">
                <div class="BoardDiv">
                    <p class="BoardName">${quadro.name}</p>
                </div>
            </a>
        `

        div.innerHTML=div.innerHTML+conteudotemporario;

    })

}

//Define qual quadro esta atualmente em uso
function definirquadroatual(boardid){

    //Armazena a informação no arquivo JSON
    localStorage.setItem("quadroatual", boardid);

}





//------------------- INTERFACE ------------------- INTERFACE ------------------- INTERFACE ------------------- INTERFACE ------------------- INTERFACE

//Função para abrir ou fechar a janela de criação de quadro
function janeladecriacaodequadro(decision){

    //Acessa a div responsável pela janela de criação do quadro e faz a alteração
    var div = document.getElementById("BoardCreationTab").style.display=decision;

}

//Função que trata os dados e inicia criação do quadro
function iniciarcriacaodoquadro(){

    //Acessa caixas de erro
    var caixaerro1 = document.getElementById("boardcreationtaberror1");
    var caixaerro2 = document.getElementById("boardcreationtaberror2");

    //Acessa os textos das caixas de erro
    var erro1 = document.getElementById("boardcreationtaberror1text");
    var erro2 = document.getElementById("boardcreationtaberror2text");

    //Reseta caixas de erro antes de iniciar o processo de verificação
    caixaerro1.style.display="none";
    caixaerro2.style.display="none";

    //Acessa os campos de digitação e pega as informações digitadas
    var nomedigitado = document.getElementById("boardcreationinput1");
    var corinserida = document.getElementById("boardcreationinput2");

    //---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES ---------- VERIFICAÇÔES

    //Se não houver nome digitado
    if(nomedigitado.value == ""){

        //Mostrar o seguinte erro
        erro1.innerHTML="Nenhum nome foi digitado para a lista!";
        caixaerro1.style.display="flex";

        //Cancelar criação do quadro
        return;
    }

    //Se não houver cor inserida/digitada
    if(corinserida.value == ""){

        //Mostrar o seguinte erro
        erro2.innerHTML="Nenhuma cor foi inserida para o plano de fundo!";
        caixaerro2.style.display="flex";

        //Cancelar criação do quadro
        return;
    }

    //Verifica se a cor inserida é valida
    if(!corvalida(corinserida.value)){

        //Exibir mensagem de erro
        erro2.innerHTML="Somente é aceito no formato inglês, hexadecimal ou rgb!";
        caixaerro2.style.display = "flex";

        //Cancelar criação do quadro
        return;

    }

    //Fecha a janela
    janeladecriacaodequadro('none')

    //Salva o quadro
    criarumquadro(nomedigitado.value, corinserida.value);

}