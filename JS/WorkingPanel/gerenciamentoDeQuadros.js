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

    //Altera o endereço na location bar
    window.location.href = "WorkingPanel.html?quadro=" + boardid

}