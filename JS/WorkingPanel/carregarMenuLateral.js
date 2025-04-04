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