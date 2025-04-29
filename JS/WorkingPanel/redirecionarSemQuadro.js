//Detecta e expulsa usuario que entrar na página sem ter um quadro criado e ativo
function bloquearusosemquadro(){
    
    let dadosdotrello = consultarData("dadosdotrello"); //Consulta os dados
    let quadroatual = consultarquadroatual(); //Consulta qual quadro está em uso

    //Verifica se existe algum quadro criado
    let existequadro = dadosdotrello && dadosdotrello.quadros && dadosdotrello.quadros.length > 0;

    const stringsDaUrl = window.location.search; //Pega a url
    const parametrosDaUrl = new URLSearchParams(stringsDaUrl); //Busca a variavel Quadro na url
    const urlId = parametrosDaUrl.get("quadro"); //Pega o valor

    //Caso não exista, redireciona o usuario
    if(!existequadro || !quadroatual || urlId != quadroatual){
        window.location.href = "Boards.html";
    }

}