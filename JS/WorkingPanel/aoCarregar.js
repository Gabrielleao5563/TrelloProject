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