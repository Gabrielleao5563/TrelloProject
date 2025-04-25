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
            <a onclick="definirquadroatual(${quadro.id})" class="BoardLink" href="WorkingPanel.html?quadro=${quadro.id}">
                <div class="BoardDiv">
                    <p class="BoardName">${quadro.name}</p>
                </div>
            </a>
        `

        div.innerHTML=div.innerHTML+conteudotemporario;

    })

}