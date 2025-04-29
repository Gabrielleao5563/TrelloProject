//Função que renomeia uma lista
function renomearLista(nomeAtual, listaID){

    var textoNome = document.getElementById(String("nomeLista" + listaID)); //Pega o texto da lista
    var inputNome = document.getElementById(String("inputNomeLista" + listaID)); //Pega o input da lista

    exibirInput();












    function exibirInput(){

        textoNome.style.display="none"; //Esconde o texto com o nome atual da lista
        inputNome.style.display="initial"; //Mostra o input
        inputNome.focus(); //Define o foco dentro do input
        inputNome.value=textoNome.innerHTML; //Insere o nome atual da lista dentro do input
    
    }
    function esconderInput(){

        textoNome.style.display="initial"; //Exibe o nome da lista de volta
        inputNome.style.display="none"; //Esconde o input
        
    }

}