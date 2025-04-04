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