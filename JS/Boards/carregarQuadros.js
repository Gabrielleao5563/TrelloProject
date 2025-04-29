//Função responsável por carregar os quadros existentes na tela
function carregarquadros(){

    var div = document.getElementById("BoardsContainer"); //Acessa a div que contem os quadros
    
    var conteudotemporario=""; //variavel que segura conteúdo temporariamente durante execução

    div.innerHTML=""; //Limpa o conteudo inicial

    let dadosdotrello = consultarData("dadosdotrello"); //Consulta os dados

    //Se não for encontrado nenhum quadro existente
    if(dadosdotrello.quadros == ""){

        //Exibe dentro da página a mensagem
        div.innerHTML="<p class='genericerrortext'>Ops, não há nenhum quadro criado. Que tal criar um?</p>"

        //Finaliza a função de carregamento
        return;

    }


    //Executa a tudo a partir daqui uma vez para cada quadro existente
    dadosdotrello.quadros.forEach(quadro => {

        conteudotemporario =`
            <!-- Quadro ${quadro.name} -->
            <a onclick="definirquadroatual(${quadro.id})" class="BoardLink" href="WorkingPanel.html?quadro=${quadro.id}">
                <div class="BoardDiv">
                    <p class="BoardName">${quadro.name}</p>
                </div>
            </a>
        `

        div.innerHTML=div.innerHTML+conteudotemporario;

    })
}