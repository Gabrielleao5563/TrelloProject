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

                <p Class="ListNameText" id="NomeLista${lista.id}" onclick="renomearLista(${lista.id})">${lista.name}</p>

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