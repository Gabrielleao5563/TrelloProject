//O que fazer quando carregar a página
window.onload = function(){

    //Roda a função que verifica existencia de um arquivo JSON
    verificarjson();

    //Roda a função que bloqueia uso sem quadro criado e ativo
    bloquearusosemquadro();

    //Roda a função que carrega as listas
    carregarlistas();

    //Roda a função que carrega os quadros no menu lateral
    carregarquadrosmenulateral();

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
        console.log("Arquivo JSON criado");
    }else{
        //Caso arquivo já existir, nao fazer nada
        console.log("Arquivo JSON já existe");
    }
}

let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Puxa os dados atuais do arquivo JSON e insere para ser usado no código
console.log("Dados encontrados no arquivo JSON ao carregar: " + dadosdotrello); //Registra o que foi encontrado no arquivo JSON para o console

//Detecta e expulsa usuario que entrar na página sem ter um quadro criado e ativo
function bloquearusosemquadro(){
    
    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Acessa o arquivo JSON
    let quadroatual = localStorage.getItem("quadroatual"); //Procura saber se tem um quadro aberto

    //Verifica se existe algum quadro criado
    let existequadro = dadosdotrello && dadosdotrello.quadros && dadosdotrello.quadros.length > 0;


    //Caso não exista, redireciona o usuario
    if(!existequadro || !quadroatual){
        window.location.href = "Boards.html";
    }

}





//Funcao responsável por criar uma nova lista
function criarumalista(boardid, name, position){

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

    //Recarrega as listas existentes
    carregarlistas();
}





//Define qual quadro esta atualmente em uso
function definirquadroatual(boardid){

    //Armazena a informação no arquivo JSON
    localStorage.setItem("quadroatual", boardid);

}

//Verifica qual o quadro atualmente em uso
function consultarquadroatual(){

    //Retorna o resultado como um numero inteiro
    return parseInt(localStorage.getItem("quadroatual")) || null;

}

//Recarrega o conteúdo ao trocar de quadro
function trocarquadro(boardid){

    //Salva o novo quadro como o atualmente em uso
    definirquadroatual(boardid);

    carregarlistas();

    carregarquadrosmenulateral();

}

//Funcao responsavel por carregar todas as listas existentes
function carregarlistas(){

    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello")); //Coleta as informações das listas
    let quadroemuso = consultarquadroatual(); //Acessa a informação de qual quadro está em uso

    //Caso não exista quadro aberto
    if(!quadroemuso) {

        return; //Quebra a execução da função
    
    }

    //Mantem apenas as listas relacionadas ao quadro atual e as coloca na ordem de aprensentação
    let listasordenadas = dadosdotrello.listas.filter(lista => lista.boardid === quadroemuso).sort((a, b) => a.position - b.position);

    var divdaslistas = document.getElementById("ListsSeparation"); //Obtem acesso total a div que contem as listas
    var conteudotemporario = ""; //Variavel que vai segurar conteúdos temporariamente para ajudar no manuseio dos dados

    divdaslistas.innerHTML=""; //Limpa o conteúdo atual antes de carregar

    //Executa uma vez para cada uma das listas
    listasordenadas.forEach( lista => {
        
        //Cria o bloco de conteúdo personalizando as informações com base no arquivo JSON
        conteudotemporario = `
            <!--Lista "${lista.name}"-->
            <div Class="List" id="List${lista.id}">

                <p Class="ListNameText" id="NomeLista${lista.id}">${lista.name}</p>

                <!-- Botão da lista -->
                <div onclick="abrirmenuflutuantedalista(${lista.id}, event)" class="FixedListTreePointBTN">
                    <img src="../ICONS/3points.png" alt="Opções da lista">
                </div>

            </div>
        `

        //Insere o conteúdo gerado na div para exibir a lista na tela
        divdaslistas.innerHTML = divdaslistas.innerHTML + conteudotemporario;

    })

}

function renomearlista(idlista, novonome){

}

function renomearcartao(idcartao, novonome){

}






//----- INTERFACE ----- INTERFACE ----- INTERFACE ----- INTERFACE ----- INTERFACE ----- INTERFACE ----- INTERFACE

//Abre uma janela especificada
function abrirjanela(tabid, how){

    var janela = document.getElementById(tabid); //Acessa o elemento
    janela.style.display=how; //Exibe o elemento

}

//Fecha uma janela especificada
function fecharjanela(tabid){

    var janela = document.getElementById(tabid); //Acessa o elemento
    janela.style.display="none"; //Oculta o elemento

}

//Carrega os quadros na lista do menu lateral
function carregarquadrosmenulateral(){

    //Acessa a div que contem os quadros
    var div = document.getElementById("sidemenuboardsul");

    //variavel que segura conteúdo temporariamente durante execução
    var conteudotemporario="";

    //Limpa o conteúdo inicial
    div.innerHTML="";

    //Acessa o JSON e pega os dados
    let dadosdotrello = JSON.parse(localStorage.getItem("dadosdotrello"));

    //Executa a tudo a partir daqui uma vez para cada quadro existente
    dadosdotrello.quadros.forEach(quadro => {

        //Define o conteúdo
        conteudotemporario =`
            <!-- Bloco do quadro "${quadro.name}" -->
            <ul onclick="trocarquadro(${quadro.id})">
                <div class="SideMenuOptionContentHolder ${verificarselecionado()}">
                    <!-- Icone do quadro "${quadro.name}" -->
                    <div class="SideMenuOptionContentHolderImage" style="background-color: ${quadro.background}">
                        <img style="width: 80%;" src="../ICONS/MyBoardsIcon.png" alt="Icone do quadro '${quadro.name}'">
                    </div>
                    <!-- Nome do quadro "${quadro.name}" -->
                    <div class="SideMenuOptionContentHolderText">
                        <p class="SideMenuOption">${quadro.name}</p>
                    </div>
                </div>
            </ul>
        `

        function verificarselecionado(){

            if(consultarquadroatual() === quadro.id){

                return "quadroselecionado";
            
            }else{
                
                return "";

            }

        }

        //Adiciona o conteúdo na div
        div.innerHTML=div.innerHTML+conteudotemporario;

    })

}

//Prepara a interface para renomear uma lista
function iniciartrocadenomelista(idlista, idtexto, idinput){

    //Pega tag P de texto da lista
    var textonome = document.getElementById(idtexto);

    //Pega input de nome da lista
    var inputnome = document.getElementById(idinput);

}

//Abre o menu flutuante da lista
function abrirmenuflutuantedalista(listaid, event) {
    //Previne mau uso do botão
    event.preventDefault();

    //Acessa a div do menu
    const divdomenu = document.getElementById("floatinglistmenudiv");

    // Se clicando no mesmo botao de novo, mantem aberto
    if (divdomenu.style.display === "block") {
        fecharmenulista(); // Close first
    }

    // Gera as opções do menu dinamicamente
    divdomenu.innerHTML = `
        <ul>
            <li onclick="iniciartrocadenomelista(${listaid}, 'ListaNome${listaid}', 'ListaInput${listaid}'); fecharmenulista()">Renomear lista</li>
            <li onclick="fecharmenulista()">Excluir lista</li>
        </ul>
    `;

    // Pega a posição do cursor
    const x = event.pageX;
    const y = event.pageY;

    // Posiciona o menu
    divdomenu.style.left = `${x}px`;
    divdomenu.style.top = `${y}px`;
    divdomenu.style.display = "block";

    // Apenas fecha o menu ao clicar fora
    setTimeout(() => {
        document.addEventListener("click", fecharmenulista);
    }, 100);
}
function fecharmenulista(event) {
    const divdomenu = document.getElementById("floatinglistmenudiv");

    // Não fazer nada se o clique for dentro do menu ou do botão
    if (event && (divdomenu.contains(event.target) || event.target.closest(".FixedListTreePointBTN"))) {
        return;
    }

    //Oculta o menu e reseta a função
    divdomenu.style.display = "none";
    document.removeEventListener("click", fecharmenulista);
}

//Define o foco em um elemento
function definirfoco(id) {

    //Pega o acesso ao elemento e define o foco
    var elemento = document.getElementById(id).focus();

}





//Trata os dados e prossegue com a criação da lista
function comecarcriacaodalista(){

    //Consulta qual o quadro ativo
    var quadroid = consultarquadroatual();

    //Pega o nome digitado na caixa de texto
    var listanome = document.getElementById("ListCreationTabInput").value;

    //Verifica se foi digitado algo no campo do nome
    if(listanome === ""){

        //Se nada foi digitado, auto nomear
        listanome = "Lista sem nome";

    }

    //Caso não tenha quadro ativo
    if(!quadroid){

        //Encerrar criação da lista
        return;

    }

    //Filtra apenas as listas referentes a esse quadro
    let listasdessequadro = dadosdotrello.listas.filter(lista => lista.boardid === quadroid);

    //Decide a posição ideal para a lista
    var posicao = listasdessequadro.length + 1;

    //Chama a função para salvar
    criarumalista(quadroid, listanome, posicao);

    //Pega acesso ao input
    var nomeinput = document.getElementById("ListCreationTabInput");

    //Limpa o campo de digitação após criar
    nomeinput.value="";

    fecharjanela('ListCreationTab');

}